<template>
  <div class="dashboard-container">
    <!-- 顶部数据卡片 -->
    <el-row :gutter="10" class="mb-20">
      <el-col :xs="24" :sm="12" :md="6">
        <div class="data-card" :class="{ 'animate__animated animate__fadeInUp': !loading }">
          <div class="card-header">
            <div class="title">总用户数</div>
            <el-tag type="success" effect="dark" size="small">日</el-tag>
          </div>
          <div class="card-content">
            <count-to :startVal="0" :endVal="98500" :duration="2500" separator="," class="card-number" />
            <div class="trend">
              <span>较昨日</span>
              <span class="up">↑ 24%</span>
            </div>
          </div>
          <div class="card-chart">
            <mini-area :data="userData" :height="50" />
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <div class="data-card" :class="{ 'animate__animated animate__fadeInUp': !loading }"
          style="animation-delay: 0.1s">
          <div class="card-header">
            <div class="title">活跃用户</div>
            <el-tag type="warning" effect="dark" size="small">月</el-tag>
          </div>
          <div class="card-content">
            <count-to :startVal="0" :endVal="693700" :duration="2500" separator="," class="card-number" />
            <div class="trend">
              <span>月环比</span>
              <span class="down">↓ 12%</span>
            </div>
          </div>
          <div class="card-chart">
            <mini-line :data="activeData" :height="50" />
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <div class="data-card" :class="{ 'animate__animated animate__fadeInUp': !loading }"
          style="animation-delay: 0.2s">
          <div class="card-header">
            <div class="title">订单数量</div>
            <el-tag type="danger" effect="dark" size="small">日</el-tag>
          </div>
          <div class="card-content">
            <count-to :startVal="0" :endVal="72000" :duration="2500" separator="," class="card-number" />
            <div class="trend">
              <span>较昨日</span>
              <span class="up">↑ 16%</span>
            </div>
          </div>
          <div class="card-chart">
            <mini-bar :data="orderData" :height="50" />
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <div class="data-card" :class="{ 'animate__animated animate__fadeInUp': !loading }"
          style="animation-delay: 0.3s">
          <div class="card-header">
            <div class="title">销售额</div>
            <el-tag type="info" effect="dark" size="small">总</el-tag>
          </div>
          <div class="card-content">
            <count-to :startVal="0" :endVal="1234567" :duration="2500" separator="," prefix="¥" class="card-number" />
            <div class="trend">
              <span>年同比</span>
              <span class="up">↑ 35%</span>
            </div>
          </div>
          <div class="card-chart">
            <mini-progress :percentage="75" :height="50" />
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 中部图表 -->
    <el-row :gutter="10" class="mb-20">
      <el-col :xs="24" :sm="24" :md="18">
        <div class="chart-card" :class="{ 'animate__animated animate__fadeInUp': !loading }"
          style="animation-delay: 0.2s;">
          <div class="card-header">
            <div class="title">销售趋势</div>
            <div class="extra">
              <el-radio-group v-model="timeRange" size="small">
                <el-radio-button label="week">本周</el-radio-button>
                <el-radio-button label="month">本月</el-radio-button>
                <el-radio-button label="year">全年</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="card-content">
            <trend-chart ref="trendChart" :loading="loading" :time-range="timeRange" />
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="6">
        <div class="chart-card" :class="{ 'animate__animated animate__fadeInUp': !loading }"
          style="animation-delay: 0.2s;">
          <div class="card-header">
            <div class="title">热门产品</div>
            <div class="extra">
              <el-button type="primary" size="small">查看更多</el-button>
            </div>
          </div>
          <div class="card-content">
            <el-scrollbar height="380px">
              <el-table :data="hotProducts" style="width: 100%" size="default">
                <el-table-column prop="rank" label="排名" width="80" />
                <el-table-column prop="name" label="产品名称" />
                <el-table-column prop="sales" label="销量" width="120" />
                <el-table-column prop="growth" label="增长率" width="120">
                  <template #default="{ row }">
                    <span :class="row.growth >= 0 ? 'up' : 'down'">{{ row.growth >= 0 ? '↑' : '↓' }} {{
                      Math.abs(row.growth) }}%</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-scrollbar>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 底部数据 -->
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="8">
        <div class="chart-card" :class="{ 'animate__animated animate__fadeInUp': !loading }"
          style="animation-delay: 0.2s; height: 350px">
          <div class="card-header">
            <div class="title">实时动态</div>
            <div class="extra">
              <el-button type="primary" size="small">查看更多</el-button>
            </div>
          </div>
          <div class="card-content">
            <el-scrollbar height="300px">
              <el-timeline style="padding: 10px">
                <el-timeline-item v-for="(activity, index) in activities" :key="index" :type="activity.type as any"
                  :color="activity.color" :timestamp="activity.time" :hollow="activity.hollow">
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
            </el-scrollbar>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8">
        <div class="chart-card" :class="{ 'animate__animated animate__fadeInUp': !loading }"
          style="animation-delay: 0.3s; height: 350px">
          <div class="card-header">
            <div class="title">销售排行榜</div>
            <div class="extra">
              <el-radio-group v-model="salesRankType" size="small">
                <el-radio-button label="daily">日榜</el-radio-button>
                <el-radio-button label="weekly">周榜</el-radio-button>
                <el-radio-button label="monthly">月榜</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="card-content">
            <el-scrollbar height="280px">
              <div class="rank-list" :class="{ 'animate__animated animate__fadeIn': true }">
                <div v-for="(item, index) in salesRankList" :key="index" class="rank-item">
                  <div class="rank-number" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</div>
                  <div class="rank-info">
                    <div class="rank-name">{{ item.name }}</div>
                    <div class="rank-detail">
                      <span class="sales">¥{{ item.amount.toLocaleString() }}</span>
                      <el-progress :percentage="item.percentage" :color="item.color" :show-text="false" />
                    </div>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8">
        <div class="chart-card" :class="{ 'animate__animated animate__fadeInUp': !loading }"
          style="animation-delay: 0.4s; height: 350px">
          <div class="card-header">
            <div class="title">用户反馈</div>
            <div class="extra">
              <el-tag v-for="tag in feedbackTags" :key="tag.name" :type="tag.type" class="mx-5" effect="light">
                {{ tag.name }} ({{ tag.count }})
              </el-tag>
            </div>
          </div>
          <div class="card-content">
            <el-scrollbar height="280px">
              <div v-for="(feedback, index) in userFeedbacks" :key="index" class="feedback-item">
                <el-avatar :size="40" :src="feedback.avatar" />
                <div class="feedback-content">
                  <div class="feedback-header">
                    <span class="username">{{ feedback.username }}</span>
                    <el-rate v-model="feedback.rating" disabled text-color="#ff9900" />
                    <span class="time">{{ feedback.time }}</span>
                  </div>
                  <div class="feedback-text">{{ feedback.content }}</div>
                  <div class="feedback-images" v-if="feedback.images && feedback.images.length">
                    <el-image v-for="(image, imgIndex) in feedback.images" :key="imgIndex" :src="image"
                      :preview-src-list="feedback.images" fit="cover" class="feedback-image" />
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { CountTo } from 'vue3-count-to'
import 'animate.css'
import MiniArea from './components/MiniArea.vue'
import MiniLine from './components/MiniLine.vue'
import MiniBar from './components/MiniBar.vue'
import MiniProgress from './components/MiniProgress.vue'
import TrendChart from './components/TrendChart.vue'
import { TagProps } from 'element-plus'

interface TagsItem {
  name: string
  type: TagProps['type'],
  count: number
}
// 加载状态
const loading = ref(true)

// 图表数据
const userData = ref([30, 40, 20, 50, 40, 80, 90])
const activeData = ref([40, 80, 50, 90, 60, 70, 50])
const orderData = ref([60, 70, 80, 40, 50, 90, 70])

// 时间范围
const timeRange = ref('month')

// 销售排行榜数据
const salesRankType = ref('daily')
const dailyRankList = [
  { name: '智能手表 Pro Max', amount: 289999, percentage: 95, color: '#f56c6c' },
  { name: '无线降噪耳机', amount: 199999, percentage: 85, color: '#e6a23c' },
  { name: '智能手环 5', amount: 159999, percentage: 75, color: '#409eff' },
  { name: '智能音箱 2代', amount: 129999, percentage: 65, color: '#67c23a' },
  { name: '智能摄像头 Pro', amount: 99999, percentage: 55, color: '#909399' },
  { name: '智能体脂秤', amount: 89999, percentage: 45, color: '#909399' },
  { name: '智能门锁', amount: 79999, percentage: 35, color: '#909399' },
  { name: '智能台灯', amount: 69999, percentage: 25, color: '#909399' }
]

const weeklyRankList = [
  { name: '无线降噪耳机', amount: 1299999, percentage: 98, color: '#f56c6c' },
  { name: '智能手表 Pro Max', amount: 999999, percentage: 88, color: '#e6a23c' },
  { name: '智能音箱 2代', amount: 859999, percentage: 78, color: '#409eff' },
  { name: '智能手环 5', amount: 759999, percentage: 68, color: '#67c23a' },
  { name: '智能摄像头 Pro', amount: 659999, percentage: 58, color: '#909399' },
  { name: '智能门锁', amount: 559999, percentage: 48, color: '#909399' },
  { name: '智能体脂秤', amount: 459999, percentage: 38, color: '#909399' },
  { name: '智能台灯', amount: 359999, percentage: 28, color: '#909399' }
]

const monthlyRankList = [
  { name: '智能音箱 2代', amount: 5299999, percentage: 96, color: '#f56c6c' },
  { name: '智能手表 Pro Max', amount: 4599999, percentage: 86, color: '#e6a23c' },
  { name: '无线降噪耳机', amount: 3899999, percentage: 76, color: '#409eff' },
  { name: '智能摄像头 Pro', amount: 3299999, percentage: 66, color: '#67c23a' },
  { name: '智能手环 5', amount: 2699999, percentage: 56, color: '#909399' },
  { name: '智能门锁', amount: 2099999, percentage: 46, color: '#909399' },
  { name: '智能体脂秤', amount: 1599999, percentage: 36, color: '#909399' },
  { name: '智能台灯', amount: 999999, percentage: 26, color: '#909399' }
]

const salesRankList = ref(dailyRankList)

// 监听排行榜类型变化
watch(salesRankType, (newType) => {
  switch (newType) {
    case 'daily':
      salesRankList.value = dailyRankList
      break
    case 'weekly':
      salesRankList.value = weeklyRankList
      break
    case 'monthly':
      salesRankList.value = monthlyRankList
      break
  }
})

// 用户反馈数据
const feedbackTags = ref<TagsItem[]>([
  { name: '好评', count: 1234, type: 'success' },
  { name: '一般', count: 234, type: 'warning' },
  { name: '差评', count: 34, type: 'danger' }
])

const userFeedbacks = ref([
  {
    username: '张小明',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    rating: 5,
    time: '2024-01-15 14:30',
    content: '智能手表非常好用，续航能力强，运动功能齐全，非常满意！',
    images: [
      'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
    ]
  },
  {
    username: '李小红',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    rating: 4,
    time: '2024-01-15 13:25',
    content: '音质不错，降噪效果很好，就是价格稍微有点小贵。'
  },
  {
    username: '王小军',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    rating: 5,
    time: '2024-01-15 12:18',
    content: '手环功能很全面，防水性能好，运动检测准确，推荐购买！',
    images: [
      'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
    ]
  },
  {
    username: '赵小华',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    rating: 3,
    time: '2024-01-15 11:05',
    content: '音箱音质一般，智能助手反应有点慢，期待后续优化。'
  },
  {
    username: '陈小婷',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    rating: 5,
    time: '2024-01-15 10:30',
    content: '摄像头画质清晰，夜视效果好，安装简单，很满意的一次购物！'
  }
])

// 热门产品数据
const hotProducts = ref([
  { rank: 1, name: '智能手表 Pro', sales: 1234, growth: 12.3 },
  { rank: 2, name: '无线耳机 MAX', sales: 1156, growth: 8.7 },
  { rank: 3, name: '智能音箱 Mini', sales: 986, growth: -5.2 },
  { rank: 4, name: '运动手环 4', sales: 876, growth: 15.8 },
  { rank: 5, name: '智能摄像头', sales: 765, growth: 7.4 },
  { rank: 6, name: '智能家具', sales: 1234, growth: 12.3 },
  { rank: 7, name: '无线电视', sales: 1156, growth: 8.7 },
  { rank: 8, name: '智能机器人', sales: 986, growth: -5.2 },
  { rank: 9, name: '运动手表', sales: 876, growth: 15.8 },
  { rank: 10, name: '智能家电', sales: 765, growth: 7.4 }
])

// 实时动态数据
const activities = ref([
  { content: '张三购买了智能手表 Pro', time: '刚刚', type: 'success', color: '#67C23A', hollow: true },
  { content: '系统更新完成', time: '5分钟前', type: 'info', color: '#909399' },
  { content: '李四完成了实名认证', time: '10分钟前', type: 'primary', color: '#409EFF' },
  { content: '新增订单 10086', time: '20分钟前', type: 'warning', color: '#E6A23C' },
  { content: '系统预警：CPU使用率过高', time: '1小时前', type: 'danger', color: '#F56C6C' }
])

// 模拟数据加载
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style scoped lang="scss">
.dashboard-container {
  padding: 5px;
  background-color: var(--el-bg-color-page);
  min-height: calc(100vh - 100px);

  .mb-20 {
    margin-bottom: 12px;
  }

  .data-card {
    padding: 16px;
    background: var(--el-bg-color);
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .title {
        font-size: 16px;
        font-weight: 600;
        color: var(--el-text-color-primary);
      }
    }

    .card-content {
      position: relative;

      .card-number {
        font-size: 28px;
        font-weight: bold;
        color: var(--el-text-color-primary);
        line-height: 38px;
      }

      .trend {
        display: flex;
        align-items: center;
        margin-top: 6px;
        font-size: 13px;

        span:first-child {
          color: var(--el-text-color-secondary);
          margin-right: 8px;
        }
      }
    }

    .card-chart {
      margin-top: 12px;
    }
  }

  .chart-card {
    padding: 16px;
    background: var(--el-bg-color);
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;

      .title {
        font-size: 16px;
        font-weight: 600;
        color: var(--el-text-color-primary);
      }
    }

    .card-content {
      min-height: 260px;
    }
  }

  .up {
    color: #67C23A;
  }

  .down {
    color: #F56C6C;
  }

  /* 销售排行榜样式 */
  .rank-list {
    .rank-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid var(--el-border-color-lighter);

      &:last-child {
        border-bottom: none;
      }

      .rank-number {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: var(--el-fill-color-lighter);
        border-radius: 4px;
        margin-right: 12px;
        font-size: 14px;
        color: var(--el-text-color-regular);

        &.top-three {
          color: #fff;

          &:nth-child(1) {
            background-color: #f56c6c;
          }

          &:nth-child(2) {
            background-color: #e6a23c;
          }

          &:nth-child(3) {
            background-color: #409eff;
          }
        }
      }

      .rank-info {
        flex: 1;

        .rank-name {
          font-size: 14px;
          color: var(--el-text-color-primary);
          margin-bottom: 8px;
        }

        .rank-detail {
          display: flex;
          align-items: center;
          gap: 12px;

          .sales {
            font-size: 14px;
            color: var(--el-text-color-secondary);
            min-width: 100px;
          }

          .el-progress {
            flex: 1;
            margin-right: 0;
          }
        }
      }
    }
  }

  /* 用户反馈样式 */
  .feedback-item {
    display: flex;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid var(--el-border-color-lighter);

    &:last-child {
      border-bottom: none;
    }

    .feedback-content {
      flex: 1;

      .feedback-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;

        .username {
          font-size: 14px;
          font-weight: bold;
          color: var(--el-text-color-primary);
        }

        .time {
          font-size: 12px;
          color: var(--el-text-color-secondary);
        }
      }

      .feedback-text {
        font-size: 14px;
        color: var(--el-text-color-primary);
        line-height: 1.5;
        margin-bottom: 8px;
      }

      .feedback-images {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;

        .feedback-image {
          width: 80px;
          height: 80px;
          border-radius: 4px;
          object-fit: cover;
        }
      }
    }
  }

  .mx-5 {
    margin: 0 5px;
  }
}
</style>
