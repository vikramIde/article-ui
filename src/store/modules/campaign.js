import { createCampaign, getCampaigns, getReports } from '@/api/campaign'

const user = {
  state: {
    campaigns: [],
    reports: ''
  },

  mutations: {
    SET_CAMPAIGNLIST: (state, code) => {
      state.campaigns = code
    },
    SET_REPORTS: (state, code) => {
      state.reports = code
    }
  },

  actions: {
    newCampaign({ commit }, formData) {
      return new Promise((resolve, reject) => {
        createCampaign(formData).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getCampaignList({ commit }, user_id) {
      const userId = user_id
      return new Promise((resolve, reject) => {
        getCampaigns(userId).then(response => {
          commit('SET_CAMPAIGNLIST', response.data.data.campaigns)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getReports({ commit }, data) {
      return new Promise((resolve, reject) => {
        getReports(data).then(response => {
          commit('SET_REPORTS', response.data.data.reports)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
