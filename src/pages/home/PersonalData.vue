<script setup>
  import { computed, defineAsyncComponent, ref } from 'vue';
  import useVuelidate from '@vuelidate/core';
  import { required } from '@vuelidate/validators';
  import { useStore } from 'vuex';
  import { $toast } from '~/main';

  const AtPanel = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtPanel/AtPanel'));
  const AtSelect = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtSelect/AtSelect'));
  const AtButton = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtButton/AtButton'));
  const AtRadioGroup = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtRadioGroup/AtRadioGroup'));
  const AtInput = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtInput/AtInput'));
  const AtModal = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtModal/AtModal'));
  const AtDropdown = defineAsyncComponent(() => import('~/plugins/aliftech-ui/components/AtDropdown/AtDropdown'));
  const AtDropdownItem = defineAsyncComponent(() =>
    import('~/plugins/aliftech-ui/components/AtDropdownItem/AtDropdownItem')
  );

  const gender = ref(null);
  const language = ref(null);
  const clientBirthdate = ref(Number);
  const btnLoading = ref(false);
  const family_status = ref('');
  const dataListValue = ref('');
  const fieldData = ref('');
  const activatedAnimation = ref(false);
  const errorMessage = ref('');
  const totalPoint = ref(0);
  const store = useStore();
  const modal = ref(false);

  const clientscoringData = computed(() => {
    return store.getters['core/getScorePointPersonalData'];
  });
  const clientConfidence = computed(() => {
    return store.getters['core/getConfidencePointPersonalData'];
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
  const rules = {
    gender: { required },
    language: { required },
    clientBirthdate: { required },
    family_status: { required },
    dataListValue: { required },
    fieldData: { required },
  };
  const v$ = useVuelidate(rules, {
    gender,
    language,
    clientBirthdate,
    family_status,
    dataListValue,
    fieldData,
  });
  const sendClientScoringData = () => {
    v$.value.$reset();
    if (v$.value.$invalid) {
      v$.value.$touch();
      return;
    } else {
      btnLoading.value = true;
      activatedAnimation.value = false;
      store
        .dispatch('core/getPersonalData', {
          birth_date: clientBirthdate.value,
          region: dataListValue.value,
          gender: gender.value,
          marital_status: family_status.value,
          language: language.value,
          work_sphere: fieldData.value,
        })
        .catch(error => {
          $toast.show({ title: 'Error', subTitle: error?.response?.data?.message, type: 'error' });
        })
        .finally(() => {
          btnLoading.value = false;
          activatedAnimation.value = true;
        });
    }
  };
  const genders = [
    {
      title: 'Male',
      value: 'M',
    },
    {
      title: 'Female',
      value: 'F',
    },
  ];
  const languages = [
    {
      title: 'RU',
      value: 'ru',
    },
    {
      title: 'UZ',
      value: 'uz',
    },
  ];
</script>

<template>
  <div class="min-h-screen relative pb-4">
    <div class="w-3/5 flex justify-start">
      <at-panel title="Персональные данные" border-header>
        <AtInput
          label="Дата рождения клиента"
          placeholder="mm-dd-YYYY"
          mask="##-##-#####"
          :error="v$.clientBirthdate.$error"
          v-model="clientBirthdate"
        />
        <p class="text-red-500" v-if="v$.clientBirthdate.$error">Поле обязательно для заполнения</p>
        <div class="mt-4">
          <p class="mb-1">Пол</p>
          <AtRadioGroup v-model="gender" :items="genders" :error="v$.gender.$error"></AtRadioGroup>
          <p class="text-red-500" v-if="v$.gender.$error">Выберите значение</p>
        </div>
        <div class="mt-4">
          <AtSelect
            placeholder="Выберите регион"
            :error="v$.dataListValue.$error"
            :options="[
              {
                title: 'navoiy',
                value: 'navoiy',
              },
              {
                title: 'samarkand',
                value: 'samarkand',
              },
              {
                title: 'tashkent_city',
                value: 'tashkent_city',
              },
              {
                title: 'tashkent',
                value: 'tashkent',
              },
              {
                title: 'qashqadaryo',
                value: 'qashqadaryo',
              },
              {
                title: 'surxondaryo',
                value: 'surxondaryo',
              },
              {
                title: 'xorazm',
                value: 'xorazm',
              },
              {
                title: 'karakalpakstan',
                value: 'karakalpakstan',
              },
              {
                title: 'andijan',
                value: 'andijan',
              },
              {
                title: 'bukhara',
                value: 'bukhara',
              },
              {
                title: 'fergana',
                value: 'fergana',
              },
              {
                title: 'jizzakh',
                value: 'jizzakh',
              },
              {
                title: 'namangan',
                value: 'namangan',
              },
              {
                title: 'sirdarya',
                value: 'sirdarya',
              },
            ]"
            v-model="dataListValue"
          ></AtSelect>
          <span class="text-red-500" v-if="v$.dataListValue.$error">Поле обязательно для заполнения</span>
        </div>
        <div class="mt-4">
          <AtSelect
            placeholder="Семейный статус клиента"
            :error="v$.family_status.$error"
            :options="[
              {
                title: 'Состоит в браке',
                value: 'married',
              },
              {
                title: 'Не состоит в браке',
                value: 'not_married',
              },
              {
                title: 'Вдова',
                value: 'widow',
              },
              {
                title: 'В разводе',
                value: 'divorced',
              },
            ]"
            v-model="family_status"
          ></AtSelect>
          <p class="text-red-500" v-if="v$.family_status.$error">Выберите значение</p>
        </div>
        <div class="mt-4">
          <p class="mb-1">Предпочитаемый язык общения</p>
          <AtRadioGroup v-model="language" :items="languages" :error="v$.language.$error"></AtRadioGroup>
          <p class="text-red-500" v-if="v$.language.$error">Поле обязательно для заполнения</p>
        </div>
        <div class="mt-4">
          <AtSelect
            placeholder="Выберите сферы деятельности клиента"
            :error="v$.fieldData.$error"
            :options="[
              {
                title: 'Строительство,недвижимость',
                value: 'Строительство, недвижимость',
              },
              {
                title: 'Продавец-консультант,кассир',
                value: 'Продавец-консультант, кассир',
              },
              {
                title: 'Медицина,аптека',
                value: 'Медицина, аптека',
              },
              {
                title: 'Банки,лизинг,страхование',
                value: 'Банки, лизинг, страхование',
              },
              {
                title: 'Водитель,таксист',
                value: 'Водитель, таксист',
              },
              {
                title: 'Заводы,цехи,сельское хозяйство',
                value: 'Заводы, цехи, сельское хозяйство',
              },
              {
                title: 'Юристы',
                value: 'Юристы',
              },
              {
                title: 'Маркетинг,реклама,PR',
                value: 'Маркетинг, реклама, PR',
              },
              {
                title: 'Бухгалтерия',
                value: 'Бухгалтерия',
              },
              {
                title: 'Менеджер,управляющий',
                value: 'Менеджер, управляющий',
              },
              {
                title: 'Государственная служба,некоммерческие организации',
                value: 'Государственная служба, некоммерческие организации',
              },
              {
                title: 'Искусство,развлечения,масс-медиа',
                value: 'Искусство, развлечения, масс-медиа',
              },
              {
                title: 'Туризм,гостиницы,рестораны',
                value: 'Туризм, гостиницы, рестораны',
              },
              {
                title: 'Спортивные клубы,фитнес,салоны красоты',
                value: 'Спортивные клубы, фитнес, салоны красоты',
              },
              {
                title: 'Рабочий персонал',
                value: 'Рабочий персонал',
              },
              {
                title: 'Учитель, преподаватель',
                value: 'Учитель, преподаватель',
              },
              {
                title: 'Информационные технологии,интернет,телеком',
                value: 'Информационные технологии, интернет, телеком',
              },
              {
                title: 'Пенсионер/инвалид/пособия',
                value: 'Пенсионер/инвалид/пособия',
              },
              {
                title: 'Армейская служба и органы внутренних дел',
                value: 'Армейская служба и органы внутренних дел',
              },
              {
                title: 'Учащиеся/студенты',
                value: 'Учащиеся/студенты',
              },
              {
                title: 'Бизнес/предпринимательство',
                value: 'Бизнес/предпринимательство',
              },
              {
                title: 'Безработный',
                value: 'Безработный',
              },
              {
                title: 'Высший менеджмент',
                value: 'Высший менеджмент',
              },
              {
                title: 'Автомобильный бизнес',
                value: 'Автомобильный бизнес',
              },
              {
                title: 'Безопасность',
                value: 'Безопасность',
              },
              {
                title: 'Домашний персонал',
                value: 'Домашний персонал',
              },
            ]"
            v-model="fieldData"
          >
          </AtSelect>
          <span class="text-red-500" v-if="v$.fieldData.$error">Заполните поле</span>
        </div>
        <div class="mt-4 flex justify-center items-center">
          <AtButton color="primary" @click="sendClientScoringData()" :loading="btnLoading">Отправить</AtButton>
        </div>
      </at-panel>
      <transition name="fade">
        <div class="w-2/6 absolute top-0.5 right-8" style="z-index: 2" v-if="activatedAnimation">
          <at-panel title="Результат" border-header>
            <div v-if="clientscoringData && clientConfidence">
              <p>
                Скоринг клиента:
                <span class="text-xl font-bold">{{ clientscoringData }}</span>
              </p>
              <p>
                Значимость балла:
                <span class="text-xl font-bold">{{ clientConfidence }}</span>
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
