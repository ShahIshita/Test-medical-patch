<template>
  <v-app>
    <SideBar v-if="currentPath !== '/login'" />
    <UserLogin v-if="currentPath === '/login'" />
  </v-app>
</template>

<script setup>
import SideBar from "./layouts/SideBar.vue";
import UserLogin from "./views/user/UserLogin.vue";
import { useRoute } from "vue-router";

const currentPath = useRoute().path;
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap");

#app {
  font-family: "Poppins", sans-serif;

  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background-color: cyan; */
}
h1,
h2,
h3,
h4,
h5,
h6,
.card__radio {
  font-family: "Poppins", sans-serif !important;
}
div .v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: 0px 12px 20px #00000014;
  border: 1px solid #e9e9e9;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
img {
  max-width: 100%;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.v-input input {
  font-size: 18px;
}

.theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
  background-color: #fff;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
}

.v-text-field > .v-input__control > .v-input__slot:before,
.v-text-field > .v-input__control > .v-input__slot:after {
  display: none;
}
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  padding: 0 20px;
}
.v-messages__message {
  font-size: 14px;
}
.v-btn:not(.v-btn--round).v-size--large {
  height: 50px;
}
.row {
  margin: 0px -15px;
}
.row > * {
  padding: 0;
  padding-left: 15px;
  padding-right: 15px;
}
.w-100 {
  width: 100%;
}
.text-success {
  color: #29dca1;
}
.text-warning {
  color: #f8d716;
}
.text-pink {
  color: #29dca1;
}
.text-purple {
  color: #7649f2;
}
.text-info {
  color: #53eaff;
}
.text-danger {
  color: #fd5d5d;
}
.text-pink {
  color: #f719c2;
}
.text-brown {
  color: #cba9a9;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  color: #666;
  font-weight: 500;
  font-size: 12px;
}
.table-changes
  .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th,
.table-changes
  .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row) {
  border: none;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr:last-child
  > th {
  font-size: 14px;
}
.table-changes .theme--light.v-data-table {
  box-shadow: none !important;
}
.table-changes
  .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content)
  :not(.v-data-table__empty-wrapper) {
  background: none;
}
.table-changes
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td {
  border-bottom: 1px solid #e9e9e9 !important;
  font-weight: 500;
  padding: 15px 20px;
  font-size: 18px;
}
.table-changes .v-data-table > .v-data-table__wrapper > table {
  border: 1px solid #e9e9e9;
  border-bottom: none;
}
.table-changes
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td:last-child {
  width: 1%;
  white-space: nowrap;
}
@media (max-width: 600px) {
  .table-changes .v-data-table > .v-data-table__wrapper > table {
    border: none;
  }
  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    .v-data-table__mobile-table-row {
    display: flex;
    flex-wrap: wrap;
    padding: 8px 10px 10px;
    border: 1px solid #e9e9e9;
    margin-bottom: 20px;
    margin-top: 0 !important;
    border-radius: 12px;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td:first-child {
    width: auto;
    padding: 0;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td:first-child
    .v-data-table__mobile-row__header {
    display: none;
  }

  thead.v-data-table-header.v-data-table-header-mobile {
    display: none;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td {
    border: none !important;
    display: flex;
    flex-direction: column;
    padding: 0;
    font-size: 16px;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td
    .v-data-table__mobile-row__header {
    color: #7f7f7f;
    font-weight: 500;
    margin-bottom: 8px;
    font-size: 13px;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td:nth-child(2) {
    width: calc(100% - 45px);
    line-height: 1;
    padding-left: 20px;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td:first-child
    .v-image {
    max-width: 45px;
    max-height: 45px;
  }

  .table-changes
    .v-data-table
    > .v-data-table__wrapper
    > table
    > tbody
    > tr
    > td {
    width: 50%;
    align-items: flex-start;
    justify-content: center;
    line-height: 1;
    margin-top: 12px;
  }
}
.h-auto {
  height: auto !important;
}
.v-text-field.v-text-field--enclosed:not(.error--text) .v-text-field__details {
  display: none;
}
.form-group {
  margin-bottom: 28px;
}
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  padding: 10px 20px;
}
.v-text-field--filled.v-input--dense .v-label,
.v-text-field--full-width.v-input--dense .v-label {
  top: 12px;
}
.apexcharts-canvas > svg,
.apexcharts-canvas,
.apexcharts-svg.apexcharts-zoomable.hovering-zoom {
  max-width: 100%;
}

.chart-css canvas {
  border-radius: 20px;
  padding: 3%;
  margin-top: 20px;
}
div .vue-tel-input {
  border: 1px solid #efefef;
  border-radius: 10px;
}
div .vue-tel-input {
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  padding: 17px 8px;
}
div .vue-tel-input:focus-within {
  box-shadow: none;
  border-color: #e9e9e9;
}
.theme-select-box.v-select {
  margin: 0;
  padding: 0;
  align-items: center;
}

.theme-select-box.v-select > .v-input__control > .v-input__slot {
  margin: 0;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  padding: 14px;
}

.theme-select-box.v-select > .v-input__control > .v-input__slot input {
  cursor: pointer;
}

div.v-application .primary--text,
.v-application .primary--text {
  color: orange !important;
}

.v-list-item--link {
  text-align: left;
  padding: 0 26px;
}
.input-theme.v-input {
  margin-top: 0;
}
.input-theme.v-text-field > .v-input__control > .v-input__slot {
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  padding: 14px;
}
.v-text-field--full-width .v-input__prepend-outer,
.v-text-field--full-width .v-input__prepend-inner,
.v-text-field--full-width .v-input__append-inner,
.v-text-field--full-width .v-input__append-outer,
.v-text-field--enclosed .v-input__prepend-outer,
.v-text-field--enclosed .v-input__prepend-inner,
.v-text-field--enclosed .v-input__append-inner,
.v-text-field--enclosed .v-input__append-outer {
  margin-top: 6px;
}
</style>
