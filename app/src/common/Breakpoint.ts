// useBreakpoint.js
import { ref, onMounted, onUnmounted, watch } from 'vue';

export function useBreakpoint() {
  const width = ref(window.innerWidth);

  const onWidthChange = () => width.value = window.innerWidth;

  onMounted(() => window.addEventListener('resize', onWidthChange));
  onUnmounted(() => window.removeEventListener('resize', onWidthChange));

  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xl2: 1536
  };

  const greaterThanSm =  ref(false);
  const greaterThanMd =  ref(false);
  const greaterThanLg =  ref(false);
  const greaterThanXl =  ref(false);
  const greaterThanXl2 = ref(false);

  const watchThem = (newWidth: number) => {
    greaterThanSm.value =  newWidth >= breakpoints.sm;
    greaterThanMd.value =  newWidth >= breakpoints.md;
    greaterThanLg.value =  newWidth >= breakpoints.lg;
    greaterThanXl.value =  newWidth >= breakpoints.xl;
    greaterThanXl2.value = newWidth >= breakpoints.xl2;
  }
  watch(width, watchThem);
  watchThem(width.value)

  return {
    width,
    greaterThanSm,
    greaterThanMd,
    greaterThanLg,
    greaterThanXl,
    greaterThanXl2,
  };
}
