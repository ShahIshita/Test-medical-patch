<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps([
  "fieldRules",
  "errors",
  "title",
  "label",
  "placeholder",
  "name",
  "type",
  "hidden",
  "value",
]);

const emit = defineEmits(["blur"]);

const handleInput = (value) => {
  emit("blur", value);
};

const hasErrors = ref(props.errors.length > 0);
console.log(hasErrors);
</script>

<template>
  <div class="block">
    <v-text-field
      :label="label"
      filled
      dense
      :name="name"
      :type="type"
      :rules="fieldRules"
      :placeholder="placeholder"
      :value="value"
      required
      @input="handleInput"
    ></v-text-field>
  </div>
</template>
