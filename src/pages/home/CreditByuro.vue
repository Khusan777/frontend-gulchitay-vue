<script setup>
  import { computed, defineAsyncComponent, ref } from 'vue';
  import useVuelidate from '@vuelidate/core';
  import { required } from '@vuelidate/validators';
  import { getTotalPoints } from '~/services/totalPoint.api';
  import { $toast } from '~/main';
  import { useStore } from 'vuex';

  const income_summa = ref(null);
  const closed_delays_less_60_qty = ref(null);
  const closed_expired_percent_qty = ref(null);
  const current_expired_percent_qty = ref(null);
  const current_delays_less_60_qty = ref(null);
  const current_delays_less_30_qty = ref(null);
  const closed_delays_less_30_qty = ref(null);
  const current_all_delays_qty = ref(null);
  const current_all_delays_sum = ref(null);
  const closed_all_delays_sum = ref(null);
  const closed_all_delays_qty = ref(null);
  const score_point_kiac = ref(null);
  const average_monthly_payment = ref(null);
  const modal = ref(false);
  const errorMessage = ref('');
  const fullScorePoint = ref(0);
  const totalScorePoint = ref(0);
  const btnLoading = ref(false);
  const activatedAnimation = ref(false);

  const clientCreditScorePoint = computed(() => {
    return store.getters['core/getScorePointCreditData'];
  });
  const clientCreditConfidencePoint = computed(() => {
    return store.getters['core/getConfidencePointCreditData'];
  });

  const showTotalPoint = () => {
    if (!store.getters['core/getScorePointPersonalData'] || !store.getters['core/getConfidencePointPersonalData']) {
      return (errorMessage.value = 'Пожалуйста заполните карточку По Персональным данным');
    } else if (!store.getters['core/getScorePointCardData'] || !store.getters['core/getConfidencePointCardData']) {
      errorMessage.value = 'Пожалуйста заполните карточку По Скоринг карты';
    } else if (!store.getters['core/getConfidencePointCreditData'] || !store.getters['core/getScorePointCreditData']) {
      return (errorMessage.value = 'Пожалуйста заполните карточку По КБ');
    } else if (
      store.getters['core/getScorePointPersonalData'] &&
      store.getters['core/getConfidencePointPersonalData'] &&
      store.getters['core/getScorePointCardData'] &&
      store.getters['core/getConfidencePointCardData'] &&
      store.getters['core/getConfidencePointCreditData'] &&
      store.getters['core/getScorePointCreditData']
    ) {
      getTotalPoint();
    } else {
      return (errorMessage.value = 'Пожалуйста заполните все карточки');
    }
  };

  const AtButton = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtButton/AtButton'));
  const AtPanel = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtInput = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtInput/AtInput'));
  const AtModal = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtModal/AtModal'));
  const AtDropdown = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtDropdown/AtDropdown'));
  const AtDropdownItem = defineAsyncComponent(() =>
    import('~/plugins/aliftech-ui/components/AtDropdownItem/AtDropdownItem')
  );

  const store = useStore();
  const rules = {
    income_summa: { required },
    closed_delays_less_60_qty: { required },
    closed_expired_percent_qty: { required },
    current_expired_percent_qty: { required },
    current_delays_less_60_qty: { required },
    current_delays_less_30_qty: { required },
    closed_delays_less_30_qty: { required },
    current_all_delays_qty: { required },
    current_all_delays_sum: { required },
    closed_all_delays_sum: { required },
    closed_all_delays_qty: { required },
    score_point_kiac: { required },
    average_monthly_payment: { required },
  };
  const v$ = useVuelidate(rules, {
    income_summa,
    closed_delays_less_60_qty,
    closed_expired_percent_qty,
    current_expired_percent_qty,
    current_delays_less_60_qty,
    current_delays_less_30_qty,
    closed_delays_less_30_qty,
    current_all_delays_qty,
    current_all_delays_sum,
    closed_all_delays_sum,
    closed_all_delays_qty,
    score_point_kiac,
    average_monthly_payment,
  });

  const getTotalPoint = () => {
    getTotalPoints({
      'personal_info': {
        'score_point': store.getters['core/getScorePointPersonalData'],
        'confidence': store.getters['core/getConfidencePointPersonalData'],
      },
      'credit_bureau': {
        'score_point': store.getters['core/getScorePointCreditData'],
        'confidence': store.getters['core/getConfidencePointCreditData'],
      },
      'credit_card': {
        'score_point': store.getters['core/getScorePointCardData'],
        'confidence': store.getters['core/getConfidencePointCardData'],
      },
    })
      .then(response => {
        (totalScorePoint.value = response.data.message.score_point),
          (fullScorePoint.value = response.data.message.full_score_point);
      })
      .catch(response => {
        $toast.show({ title: 'Error', subTitle: response?.data?.message, type: 'error' });
      })
      .finally(() => {
        btnLoading.value = false;
      });
  };

  const sendClientScoringData = () => {
    v$.value.$reset();
    if (v$.value.$invalid) {
      v$.value.$touch();
      return;
    } else btnLoading.value = true;
    activatedAnimation.value = false;
    store
      .dispatch('core/getCreditInformation', {
        'score_point_kiac': parseInt(score_point_kiac.value),
        'average_monthly_payment': parseInt(average_monthly_payment.value),
        'closed_all_delays_qty': parseInt(closed_all_delays_qty.value),
        'closed_all_delays_sum': parseInt(closed_all_delays_sum.value),
        'current_all_delays_qty': parseInt(current_all_delays_qty.value),
        'current_all_delays_sum': parseInt(current_all_delays_sum.value),
        'closed_delays_less_30_qty': parseInt(closed_delays_less_30_qty.value),
        'current_delays_less_30_qty': parseInt(current_delays_less_30_qty.value),
        'closed_delays_less_60_qty': parseInt(closed_delays_less_60_qty.value),
        'current_delays_less_60_qty': parseInt(current_delays_less_60_qty.value),
        'closed_expired_percent_qty': parseInt(closed_expired_percent_qty.value),
        'current_expired_percent_qty': parseInt(current_expired_percent_qty.value),
        'income_summa': parseInt(income_summa.value),
      })
      .catch(error => {
        $toast.show({ title: 'Error', subTitle: error?.response?.data?.message, type: 'error' });
      })
      .finally(() => {
        btnLoading.value = false;
        activatedAnimation.value = true;
      });
  };
</script>

<template>
  <div class="min-h-screen relative pb-4">
    <div class="w-3/5">
      <at-panel title="Кредитная бюро" border-header>
        <div class="mb-2">
          <AtInput
            label="Доход по ИНПС (официальный источник заработка)"
            placeholder="*"
            :error="v$.income_summa.$error"
            v-model.number="income_summa"
          />
          <p class="text-red-500" v-if="v$.income_summa.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Закрытые кредитов с опозданием более 30 дней, не более 60 дней"
            placeholder="*"
            :error="v$.closed_delays_less_60_qty.$error"
            v-model.number="closed_delays_less_60_qty"
          />
          <p class="text-red-500" v-if="v$.closed_delays_less_60_qty.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Количество закрытых, просроченных процентов"
            placeholder="*"
            :error="v$.closed_expired_percent_qty.$error"
            v-model.number="closed_expired_percent_qty"
          />
          <p class="text-red-500" v-if="v$.closed_expired_percent_qty.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Количество открытых, просроченных процентов"
            placeholder="*"
            :error="v$.current_expired_percent_qty.$error"
            v-model.number="current_expired_percent_qty"
          />
          <p class="text-red-500" v-if="v$.current_expired_percent_qty.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Открытые кредиты которые опаздывают с оплатой на 30 до 60 дней"
            placeholder="*"
            :error="v$.current_delays_less_60_qty.$error"
            v-model.number="current_delays_less_60_qty"
          />
          <p class="text-red-500" v-if="v$.current_delays_less_60_qty.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Открытые кредиты которые опаздывают с оплатой до 30 дней"
            placeholder="*"
            :error="v$.current_delays_less_30_qty.$error"
            v-model.number="current_delays_less_30_qty"
          />
          <p class="text-red-500" v-if="v$.current_delays_less_30_qty.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Закрытые кредитов с опозданием не более 30 дней"
            placeholder="*"
            :error="v$.closed_delays_less_30_qty.$error"
            v-model.number="closed_delays_less_30_qty"
          />
          <p class="text-red-500" v-if="v$.closed_delays_less_30_qty.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Количество открытых кредитов"
            placeholder="*"
            :error="v$.current_all_delays_qty.$error"
            v-model.number="current_all_delays_qty"
          />
          <p class="text-red-500" v-if="v$.current_all_delays_qty.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Вся сумма открытых кредитов"
            placeholder="*"
            :error="v$.current_all_delays_sum.$error"
            v-model.number="current_all_delays_sum"
          />
          <p class="text-red-500" v-if="v$.current_all_delays_sum.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Вся сумма закрытых кредитов"
            placeholder="*"
            :error="v$.closed_all_delays_sum.$error"
            v-model.number="closed_all_delays_sum"
          />
          <p class="text-red-500" v-if="v$.closed_all_delays_sum.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Количество закрытых кредитов"
            placeholder="*"
            :error="v$.closed_all_delays_qty.$error"
            v-model.number="closed_all_delays_qty"
          />
          <p class="text-red-500" v-if="v$.closed_all_delays_qty.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Балл в КБ"
            placeholder="*"
            :error="v$.score_point_kiac.$error"
            v-model.number="score_point_kiac"
          />
          <p class="text-red-500" v-if="v$.score_point_kiac.$error">Поле обязательно для заполнения</p>
        </div>
        <AtInput
          label="Сумма ежемесячного платежа (при открытом кредите - ... тиин, иначе 0 тмин)"
          :error="v$.average_monthly_payment.$error"
          placeholder="*"
          v-model.number="average_monthly_payment"
        />
        <p class="text-red-500" v-if="v$.average_monthly_payment.$error">Поле обязательно для заполнения</p>
        <div class="flex justify-center items-center mt-4">
          <AtButton color="primary" @click="sendClientScoringData()" :loading="btnLoading">Отправить</AtButton>
        </div>
      </at-panel>
      <transition name="fade">
        <div class="w-2/6 absolute top-0.5 right-8" style="z-index: 2" v-if="activatedAnimation">
          <at-panel title="Результат" border-header>
            <div v-if="clientCreditScorePoint && clientCreditConfidencePoint">
              <p>
                Скоринг клиента:
                <span class="text-xl font-bold">{{ clientCreditScorePoint }}</span>
              </p>
              <p>
                Значимость балла:
                <span class="text-xl font-bold">{{ clientCreditConfidencePoint }}</span>
              </p>
              <div class="mt-4 flex justify-center items-center">
                <AtDropdown title="Выберите карточку">
                  <AtDropdownItem @click="$router.push('/')" title="Персональные данные"
                    >Персональные даннык</AtDropdownItem
                  >
                  <AtDropdownItem @click="$router.push('creditsCard')" title="Скоринг карты"
                    >Кредитная карта</AtDropdownItem
                  >
                  <AtDropdownItem @click="$router.push('creditByuro')" title="КБ">КБ</AtDropdownItem>
                </AtDropdown>
              </div>
              <div class="flex justify-center mt-4 items-center">
                <at-button :loading="btnLoading" color="primary" @click="showTotalPoint(), (modal = true)"
                  >Общий балл</at-button
                >
              </div>
            </div>
          </at-panel>
        </div>
      </transition>
    </div>
  </div>
  <AtModal v-model="modal" title="Уверенность в назначенном балле">
    <div v-if="errorMessage">
      <h1 class="text-base text-yellow-500">{{ errorMessage + '!!!' }}</h1>
    </div>
    <div v-else>
      <p class="text-center text-base font-bold mb-2">
        Общий балл: <span class="font-bold text-xl text-green-500">{{ totalScorePoint }}</span> баллов
      </p>
      <p class="text-center text-base font-bold">
        Общий балл(округлённый): <span class="font-bold text-xl text-green-500">{{ fullScorePoint }}</span> баллов
      </p>
    </div>
    <div class="flex mt-2 justify-center items-center">
      <at-button color="danger" @click="modal = false">Закрыть</at-button>
    </div>
  </AtModal>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transform: translateX(-20px);
    transition: all ease-in 0.6s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
