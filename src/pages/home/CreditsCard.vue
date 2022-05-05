<script setup>
  import { computed, defineAsyncComponent, ref } from 'vue';
  import useVuelidate from '@vuelidate/core';
  import { required } from '@vuelidate/validators';
  import { parseDate } from '~/utils/filters/dateFilters';
  import { useStore } from 'vuex';
  import { $toast } from '~/main';

  const debit0 = ref(Number);
  const debit1 = ref(Number);
  const debit2 = ref(Number);
  const debit3 = ref(Number);
  const debit4 = ref(Number);
  const debit5 = ref(Number);
  const debit6 = ref(Number);
  const credit0 = ref(Number);
  const credit1 = ref(Number);
  const credit2 = ref(Number);
  const credit3 = ref(Number);
  const credit4 = ref(Number);
  const credit5 = ref(Number);
  const credit6 = ref(Number);
  const expire = ref(new Date());
  const modal = ref(false);
  const btnLoading = ref(false);
  const totalPoint = ref(0);
  const errorMessage = ref('');
  const activatedAnimation = ref(false);
  const store = useStore();
  const clientCardScorePoint = computed(() => {
    return store.getters['core/getScorePointCardData'];
  });
  const clientCardConfidencePoint = computed(() => {
    return store.getters['core/getConfidencePointCardData'];
  });
  const showTotalPoint = () => {
    if (!store.getters['core/getScorePointPersonalData'] || !store.getters['core/getConfidencePointPersonalData']) {
      return (errorMessage.value = 'Пожалуйста заполните карточку По Персональным данным');
    } else if (!store.getters['core/getScorePointCardData'] || !store.getters['core/getConfidencePointCardData']) {
      errorMessage.value = 'Пожалуйста заполните карточку По Скоринг карты';
    } else if (!store.getters['core/getConfidencePointCreditData'] || !store.getters['core/getScorePointCreditData']) {
      return (errorMessage.value = 'Пожалуйста заполните карточку По КБ');
    } else {
      return (errorMessage.value = 'Пожалуйста заполните все карточки');
    }
  };

  const AtDatepicker = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtDatepicker/AtDatepicker'));
  const AtButton = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtButton/AtButton'));
  const AtModal = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtModal/AtModal'));
  const AtPanel = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtDropdown = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtDropdown/AtDropdown'));
  const AtDropdownItem = defineAsyncComponent(() =>
    import('~/plugins/aliftech-ui/components/AtDropdownItem/AtDropdownItem')
  );
  const AtInput = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtInput/AtInput'));
  const rules = {
    debit0: { required },
    debit1: { required },
    debit2: { required },
    debit3: { required },
    debit4: { required },
    debit5: { required },
    debit6: { required },
    credit0: { required },
    credit1: { required },
    credit2: { required },
    credit3: { required },
    credit4: { required },
    credit5: { required },
    credit6: { required },
    expire: { required },
  };
  const v$ = useVuelidate(rules, {
    debit0,
    debit1,
    debit2,
    debit3,
    debit4,
    debit5,
    debit6,
    credit0,
    credit1,
    credit2,
    credit3,
    credit4,
    credit5,
    credit6,
    expire,
  });
  const sendClientScoringData = () => {
    v$.value.$reset();
    if (v$.value.$invalid) {
      v$.value.$touch();
      return;
    } else btnLoading.value = true;
    activatedAnimation.value = false;
    store
      .dispatch('core/getCreditCardsInformation', {
        'debit0': parseFloat(debit0.value),
        'debit1': parseFloat(debit1.value),
        'debit2': parseFloat(debit2.value),
        'debit3': parseFloat(debit3.value),
        'debit4': parseFloat(debit4.value),
        'debit5': parseFloat(debit5.value),
        'debit6': parseFloat(debit6.value),
        'credit0': parseFloat(-credit0.value),
        'credit1': parseFloat(-credit1.value),
        'credit2': parseFloat(-credit2.value),
        'credit3': parseFloat(-credit3.value),
        'credit4': parseFloat(-credit4.value),
        'credit5': parseFloat(-credit5.value),
        'credit6': parseFloat(-credit6.value),
        'expire': parseDate(expire.value),
      })
      .catch(error => {
        $toast.show({ title: 'Error', subTitle: error?.data?.message, type: 'error' });
      })
      .finally(() => {
        btnLoading.value = false;
        activatedAnimation.value = true;
      });
  };
</script>

<template>
  <div class="min-h-screen relative pb-4">
    <div class="flex gap-x-4 w-3/5">
      <at-panel title="Кредитная карта" border-header>
        <div class="mb-2">
          <AtInput
            label="Приход за нынешний месяц"
            placeholder="********"
            mask="########"
            :error="v$.debit0.$error"
            v-model="debit0"
          />
          <p class="text-red-500" v-if="v$.debit0.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Приход за предыдущий месяц"
            placeholder="********"
            mask="########"
            :error="v$.debit1.$error"
            v-model="debit1"
          />
          <p class="text-red-500" v-if="v$.debit1.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Приход за 2 месяц назад"
            placeholder="********"
            mask="########"
            :error="v$.debit2.$error"
            v-model="debit2"
          />
          <p class="text-red-500" v-if="v$.debit2.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Приход за 3 месяц назад"
            placeholder="********"
            mask="########"
            :error="v$.debit3.$error"
            v-model="debit3"
          />
          <p class="text-red-500" v-if="v$.debit3.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Приход за 4 месяц назад"
            placeholder="********"
            mask="########"
            :error="v$.debit4.$error"
            v-model="debit4"
          />
          <p class="text-red-500" v-if="v$.debit4.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Приход за 5 месяц назад"
            placeholder="********"
            mask="########"
            :error="v$.debit5.$error"
            v-model="debit5"
          />
          <p class="text-red-500" v-if="v$.debit5.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Приход за 6 месяц назад"
            placeholder="********"
            mask="########"
            :error="v$.debit6.$error"
            v-model="debit6"
          />
          <p class="text-red-500" v-if="v$.debit6.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Расходы за нынешний месяц"
            placeholder="********"
            mask="########"
            :error="v$.credit0.$error"
            v-model="credit0"
          />
          <p class="text-red-500" v-if="v$.credit0.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Расходы за предыдущий месяц"
            placeholder="********"
            mask="########"
            :error="v$.credit1.$error"
            v-model="credit1"
          />
          <p class="text-red-500" v-if="v$.credit1.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Расходы за 2 месяц назад"
            placeholder="********"
            mask="########"
            :error="v$.credit2.$error"
            v-model="credit2"
          />
          <p class="text-red-500" v-if="v$.credit2.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Расходы за 3 месяц назад"
            placeholder="********"
            mask="########"
            :error="v$.credit3.$error"
            v-model="credit3"
          />
          <p class="text-red-500" v-if="v$.credit3.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Расходы за 4 месяц назад"
            placeholder="********"
            mask="########"
            :error="v$.credit4.$error"
            v-model="credit4"
          />
          <p class="text-red-500" v-if="v$.credit4.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Расходы за 5 месяц назад"
            placeholder="********"
            mask="########"
            :error="v$.credit5.$error"
            v-model="credit5"
          />
          <p class="text-red-500" v-if="v$.credit5.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mb-2">
          <AtInput
            label="Расходы за 6 месяц назад"
            placeholder="********"
            mask="########"
            :error="v$.credit6.$error"
            v-model="credit6"
          />
          <p class="text-red-500" v-if="v$.credit6.$error">Поле обязательно для заполнения</p>
        </div>
        <AtDatepicker label="Срок действия карты" v-model="expire" />
        <p class="text-red-500" v-if="v$.expire.$error">Поле обязательно для заполнения</p>
        <div class="flex justify-center items-center mt-4">
          <AtButton color="primary" @click="sendClientScoringData()" :loading="btnLoading">Отправить</AtButton>
        </div>
      </at-panel>
      <transition name="fade">
        <div class="w-2/6 absolute top-0.5 right-8" style="z-index: 2" v-if="activatedAnimation">
          <at-panel title="Результат" border-header>
            <div v-if="clientCardScorePoint && clientCardConfidencePoint">
              <p>
                Скоринг клиента:
                <span class="text-xl font-bold">{{ clientCardScorePoint }}</span>
              </p>
              <p>
                Значимость балла:
                <span class="text-xl font-bold">{{ clientCardConfidencePoint }}</span>
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
                <at-button color="primary" @click="showTotalPoint(), (modal = true)">Общий балл</at-button>
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
      <p class="text-center text-base font-bold">
        Общий балл: <span class="font-bold text-xl text-green-500">{{ totalPoint.toFixed(2) + ' ' }}</span> баллов
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
