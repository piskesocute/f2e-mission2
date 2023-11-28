<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  defaultOption: {
    type: String,
    default: '請選擇'
  }
});

const emit = defineEmits(['update:modelValue']);
const option = ref(null);
const SELECTED_ITEM = computed(() => {
  if (option.value) {
    return option.value;
  }
  return option.value || props.defaultOption;
});
const selectItem = (item) => {
  option.value = item;
  emit('update:modelValue', item);
};
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="w-full inline-flex justify-center gap-x-8px border-1px border-#e6e6e6 rounded-8px border-solid bg-white px-12px py-4px shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        {{ SELECTED_ITEM }}
        <ChevronDownIcon class="h-5 w-5 text-gray-400 -mr-1" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute left-0 z-10 mt-2 h-20vh w-56 origin-top-right overflow-y-scroll rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-slot="{ active }" v-for="item in data" :key="item">
            <a
              @click="selectItem(item)"
              href="#"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm'
              ]"
              >{{ item }}</a
            >
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
