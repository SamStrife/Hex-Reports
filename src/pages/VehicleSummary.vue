,
<template>
  <q-page>
    <div class="q-pa-md">
      <q-form class="q-gutter-md" @submit.prevent="requestData">
        <q-input
          outlined
          type="text"
          v-model="vehicleRegistration"
          label="Vehicle Registration"
          :rules="[(val) => val.length > 0 || 'Please enter a registration']"
        />
        <q-btn type="submit" label="Get Details" color="green-10" />
      </q-form>
      <div>
        <div class="q-pa-md">
          <q-card>
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Manufacturer</div>
            </q-card-section>
            <q-separator />
            <div class="q-pa-md text-h6" v-if="requestReturn?.manufacturer">
              {{ requestReturn.manufacturer }}
            </div>
            <div class="q-pa-md text-h6" v-else><br /></div>
          </q-card>
          <br />
        </div>
        <div class="q-pa-md">
          <q-card>
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Model</div>
            </q-card-section>
            <q-separator />
            <div class="q-pa-md text-h6" v-if="requestReturn?.model">
              {{ requestReturn.model }}
            </div>
            <div class="q-pa-md text-h6" v-else><br /></div>
          </q-card>
          <br />
        </div>
        <div class="q-pa-md">
          <q-card>
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Vehicle Type</div>
            </q-card-section>
            <q-separator />
            <div class="q-pa-md text-h6" v-if="requestReturn?.vehicleType">
              {{ requestReturn.vehicleType }}
            </div>
            <div class="q-pa-md text-h6" v-else><br /></div>
          </q-card>
          <br />
        </div>
        <div class="q-pa-md">
          <q-card>
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Vehicle Status</div>
            </q-card-section>
            <q-separator />
            <div class="q-pa-md text-h6" v-if="requestReturn?.status">
              {{ requestReturn.status }}
            </div>
            <div class="q-pa-md text-h6" v-else><br /></div>
          </q-card>
          <br />
        </div>
        <div class="q-pa-md">
          <q-card>
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Vehicle Sub Status</div>
            </q-card-section>
            <q-separator />
            <div class="q-pa-md text-h6" v-if="requestReturn?.subStatus">
              {{ requestReturn.subStatus }}
            </div>
            <div class="q-pa-md text-h6" v-else><br /></div>
          </q-card>
          <br />
        </div>
        <div class="q-pa-md">
          <q-card>
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Customer</div>
            </q-card-section>
            <q-separator />
            <div class="q-pa-md text-h6" v-if="requestReturn?.customer">
              {{ requestReturn.customer }}
            </div>
            <div class="q-pa-md text-h6" v-else><br /></div>
          </q-card>
          <br />
        </div>
        <div class="q-pa-md">
          <q-card>
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Last Recorded Mileage</div>
            </q-card-section>
            <q-separator />
            <div class="q-pa-md text-h6" v-if="requestReturn?.mileage">
              {{ requestReturn.mileage }}
            </div>
            <div class="q-pa-md text-h6" v-else><br /></div>
          </q-card>
          <br />
        </div>
        <div class="q-pa-md">
          <q-card>
            <q-card-section
              :class="
                setInspectionClass(
                  requestReturn.daysUntilInspection,
                  requestReturn.inspectionDue
                )
              "
            >
              <div class="text-h6">Next Inspection Due</div>
            </q-card-section>
            <q-separator />
            <div class="q-pa-md text-h6" v-if="requestReturn?.inspectionDue">
              {{ requestReturn.inspectionDue }}
            </div>
            <div class="q-pa-md text-h6" v-else><br /></div>
          </q-card>
          <br />
        </div>
        <div class="q-pa-md">
          <q-card>
            <q-card-section
              :class="
                setMOTClass(requestReturn.monthsUntilMOT, requestReturn.motDue)
              "
            >
              <div class="text-h6">Next MOT Due</div>
            </q-card-section>
            <q-separator />
            <div class="q-pa-md text-h6" v-if="requestReturn?.motDue">
              {{ requestReturn.motDue }}
            </div>
            <div class="q-pa-md text-h6" v-else><br /></div>
          </q-card>
          <br />
        </div>
        <div class="q-pa-md">
          <q-card>
            <q-card-section
              :class="
                setTachoClass(
                  requestReturn.monthsUntilTacho,
                  requestReturn.tachoDue
                )
              "
            >
              <div class="text-h6">Next Tacho Calibration Due</div>
            </q-card-section>
            <q-separator />
            <div class="q-pa-md text-h6" v-if="requestReturn?.tachoDue">
              {{ requestReturn.tachoDue }}
            </div>
            <div class="q-pa-md text-h6" v-else><br /></div>
          </q-card>
          <br />
        </div>
      </div>
      <div>
        <div class="q-pa-md">
          <q-card>
            <q-card-section class="bg-red-10 text-white">
              <div class="text-h6">Vehicle Not Found</div>
            </q-card-section>
            <q-separator />
            <div class="q-pa-md text-h6">
              Sorry but we could not find a vehicle matching that registration.
              Please ensure you have entered the correct registration number and
              try again.
            </div>
          </q-card>
          <br />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import { date } from "quasar";

export default {
  setup() {
    const vehicleRegistration = ref("");
    const requestReturn = ref({
      manufacturer: null,
      model: null,
      vehicleType: null,
      status: null,
      subStatus: null,
      customer: null,
      mileage: null,
      inspectionDue: null,
      motDue: null,
      tachoDue: null,
      daysUntilInspection: null,
      monthsUntilMOT: null,
      monthsUntilTacho: null,
    });

    const hideResults = ref(true);

    const vehicleNotFound = computed(() => {
      if (requestReturn.value.manufacturer) {
        return false;
      } else {
        return true;
      }
    });

    function requestData() {
      axios
        .get(
          `http://127.0.0.1:5000/VehicleSummary/${vehicleRegistration.value}`
        )
        .then((response) => {
          requestReturn.value.manufacturer = response?.data?.manufacturer[0];
          requestReturn.value.model = response?.data?.model[0];
          requestReturn.value.vehicleType = response?.data?.vehicleType[0];
          requestReturn.value.status = response?.data?.status[0];
          requestReturn.value.subStatus = response?.data?.subStatus[0];
          requestReturn.value.customer = response?.data?.customer[0];
          requestReturn.value.mileage = response?.data?.mileage[0];
          requestReturn.value.inspectionDue = date.formatDate(
            response?.data?.inspectionDue[0],
            "DD/MM/YYYY"
          );
          requestReturn.value.motDue = date.formatDate(
            response?.data?.motDue[0],
            "DD/MM/YYYY"
          );
          requestReturn.value.tachoDue = date.formatDate(
            response?.data?.tachoDue[0],
            "DD/MM/YYYY"
          );
          requestReturn.value.daysUntilInspection = date.getDateDiff(
            response?.data?.inspectionDue[0],
            new Date(),
            "days"
          );
          requestReturn.value.monthsUntilMOT = date.getDateDiff(
            response?.data?.motDue[0],
            new Date(),
            "months"
          );
          requestReturn.value.monthsUntilTacho = date.getDateDiff(
            response?.data?.tachoDue[0],
            new Date(),
            "months"
          );
          hideResults.value = false;
        });
    }

    function setInspectionClass(daysUntilInspection, inspectionDue) {
      if (!inspectionDue) return "bg-grey-9 text-white";
      if (daysUntilInspection <= 0) return "bg-red-10 text-white";
      if (daysUntilInspection > 0 && daysUntilInspection < 14)
        return "bg-orange-10 text-white";
      if (daysUntilInspection >= 14) return "bg-primary text-white";
    }
    function setMOTClass(monthsUntilMOT, motDue) {
      if (!motDue) return "bg-grey-9 text-white";
      if (monthsUntilMOT < 0) return "bg-red-10 text-white";
      if (monthsUntilMOT < 2) return "bg-orange-10 text-white";
      if (monthsUntilMOT >= 2) return "bg-primary text-white";
    }
    function setTachoClass(monthsUntilTacho, tachoDue) {
      if (!tachoDue) return "bg-grey-9 text-white";
      if (monthsUntilTacho < 0) return "bg-red-10 text-white";
      if (monthsUntilTacho < 2) return "bg-orange-10 text-white";
      if (monthsUntilTacho >= 2) return "bg-primary text-white";
    }

    return {
      vehicleRegistration,
      requestData,
      requestReturn,
      setInspectionClass,
      setMOTClass,
      setTachoClass,
      vehicleNotFound,
      hideResults,
    };
  },
};
</script>
