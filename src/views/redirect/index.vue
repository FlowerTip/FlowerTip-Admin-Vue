<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

onMounted(() => {
  const { params, query } = route;
  const { path } = params;
  router.replace({ path: "/" + path, query });
});
</script>
