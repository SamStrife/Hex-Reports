<template>
  <q-page>
    <div>
      <div class="q-pa-md">
        <p class="text-weight-bolder">Instructions:</p>
        <p>
          📋 Download the event list from the Event List Page on Simply Objects
          - Make sure you apply your filters!
        </p>
        <p>🔽 Upload the file using the box below</p>
        <p>
          🏃‍♀️ Hit the "Run" button and your report should be back in around 10
          seconds!
        </p>
      </div>
      <div class="flex column flex-center">
        <q-file
          class="filebox"
          accept=".xlsx"
          max-files="1"
          outlined
          v-model="file"
          clearable
          hint="Upload 'Vehicle Events.xlsx'"
          :error="fileSelectionError"
          :error-message="fileSelectionErrorMessage"
          :loading="isLoading"
          :disable="isLoading"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <div class="q-pa-sm">
          <q-btn
            @click="sendFile"
            :disable="fileSelectionError || noFileCheck || isLoading"
            >Run</q-btn
          >
        </div>
      </div>
    </div>

    <q-dialog v-model="queryReturnError" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Report Error</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>Sorry, there was a problem with the report</p>
          <div>
            <p>Error Message:</p>
            <p>{{ queryReturnErrorMessage }}</p>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { saveAs } from "file-saver";

const file = ref();

const fileSelectionError = computed(() => {
  if (file.value == null) return false;
  if (file.value.name !== "Vehicle Events.xlsx") return true;
  return false;
});

const fileSelectionErrorMessage = ref(
  "Please ensure the file uploaded is 'Vehicle Events.xlsx'"
);

const queryReturnError = ref(false);
const queryReturnErrorMessage = ref("There was an error");

const isLoading = ref(false);

const noFileCheck = computed(() => {
  if (file.value == null) return true;
  return false;
});

async function sendFile() {
  isLoading.value = true;
  const formData = new FormData();
  formData.append("file", file.value);

  await axios({
    url: `https://api.hexreports.com/eventlistreport`,
    method: "POST",
    responseType: "arraybuffer",
    data: formData,
  })
    .then((response) => {
      console.log(response);
      const file = new File([response.data], `Event List.xlsx`, {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(file);
      isLoading.value = false;
    })
    .catch((error) => {
      var errorDecoder = new TextDecoder();
      queryReturnError.value = true;
      queryReturnErrorMessage.value = errorDecoder.decode(error.response.data);
      isLoading.value = false;
    });
}
</script>

<style>
.filebox {
  width: 500px;
}
</style>
