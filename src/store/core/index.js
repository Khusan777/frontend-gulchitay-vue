import { getScoringData } from '~/services/scoringPoint';
import { creditInformation } from '~/services/creditInformation';
import { getCreditCards } from '~/services/creditCards';
import { $toast } from '~/main';

const state = {
  activatedAnimation: false,
  btnLoading: false,
  scorePoint1: {
    data: undefined,
    error: undefined,
  },
  confidencePoint1: {
    data: undefined,
    error: undefined,
  },
  scorePoint2: {
    data: undefined,
    error: undefined,
  },
  confidencePoint2: {
    data: undefined,
    error: undefined,
  },
  scorePoint3: {
    data: undefined,
    error: undefined,
  },
  confidencePoint3: {
    data: undefined,
    error: undefined,
  },
  totalPoint: {
    data: undefined,
  },
};
const actions = {
  getPersonalData: ({ commit }, param) => {
    return getScoringData(param).then(res => {
      $toast.show({ title: 'Success', subTitle: 'Запрос прошёл успешно', type: 'success' });
      commit('SET_PERSONAL_SCORE_DATA', res.data?.message?.score_point);
      commit('SET_PERSONAL_CONFIDENCE_DATA', res.data?.message?.confidence);
      return res;
    });
  },
  getCreditInformation: async ({ commit }, param) => {
    await creditInformation(param).then(response => {
      $toast.show({ title: 'Success', subTitle: 'Запрос прошёл успешно', type: 'success' });
      commit('SET_CREDIT_SCORE_DATA', response.data?.message?.score_point);
      commit('SET_CREDIT_CONFIDENCE_DATA', response.data?.message?.confidence);
      return response;
    });
  },
  getCreditCardsInformation: async ({ commit }, param) => {
    await getCreditCards(param).then(response => {
      $toast.show({ title: 'Success', subTitle: 'Запрос прошёл успешно', type: 'success' });
      commit('SET_CARDS_SCORE_DATA', response.data?.message?.score_point);
      commit('SET_CARDS_CONFIDENCE_DATA', response.data?.message?.confidence);
      return response;
    });
  },
};

const mutations = {
  SET_PERSONAL_SCORE_DATA: (state, app) => {
    state.scorePoint1.data = app;
  },
  SET_PERSONAL_CONFIDENCE_DATA: (state, app) => {
    state.confidencePoint1.data = app;
  },
  SET_CREDIT_SCORE_DATA: (state, app) => {
    state.scorePoint2.data = app;
  },
  SET_CREDIT_CONFIDENCE_DATA: (state, app) => {
    state.confidencePoint2.data = app;
  },
  SET_CARDS_SCORE_DATA: (state, app) => {
    state.scorePoint3.data = app;
  },
  SET_CARDS_CONFIDENCE_DATA: (state, app) => {
    state.confidencePoint3.data = app;
  },
};

const getters = {
  getScorePointPersonalData: state => {
    return state.scorePoint1.data;
  },
  getConfidencePointPersonalData: state => {
    return state.confidencePoint1.data;
  },
  getScorePointCreditData: state => {
    return state.scorePoint2.data;
  },
  getConfidencePointCreditData: state => {
    return state.confidencePoint2.data;
  },
  getScorePointCardData: state => {
    return state.scorePoint3.data;
  },
  getConfidencePointCardData: state => {
    return state.confidencePoint3.data;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
