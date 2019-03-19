<template>
  <div class="dashboard-container">
    <el-container>
      <el-header>
        <el-button type="primary" @click="dialogVisible=true">Create Campaign</el-button>
      </el-header>
      <el-main>
        <el-row>
          <el-col v-for="(o, index) in campaigns" :span="4" :key="index" style="padding:5px" >
            <el-card >
              <img :src="getLogo(o)" class="image" width="300px" style="min-height:200px">
              <div style="padding: 14px;">
                <span>{{ o.name }}r</span>
                <div class="bottom clearfix">
                  <time class="time">{{ o.created_at }}</time>
                  <el-button type="text" class="button" @click="showReport(o)">View Report</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog :title="titleData" :visible.sync="dialogVisible" width="">
      <a :href="linkToDownload" type="text">Download Template</a>
      <section class="content-upload-form">
        <!-- <el-button type="success" @click="dialogVisible = true">open the Dialog</el-button> -->
        <el-form ref="form" :model="form" style="margin: 20px; width: 60%; min-width: 600px;" label-width="120px">
          <el-form-item label="Title">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="Campaign Type">
            <el-select v-model="form.master_campaigns_id" placeholder="Select your campign type">
              <el-option v-for="item in masterCampaignList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <input
              id="workflow_data_template"
              type="file"
              class="form-control"
              name="workflow_data_template">
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="form.desc" type="textarea"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit()">Submit</el-button>
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
      </section>
    </el-dialog>
    <div v-if="isReportBoxOpen" class="el-report-box">
      <el-row>
        <el-button type="text" class="button el-close" @click="isReportBoxOpen=false">X</el-button>
        <!-- <span class="el-close" @click="isReportBoxOpen=false">X</span> -->
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-input v-model="value1" placeholder="YYYY-MM-DD"/>
        </el-col>
        <el-col :span="6">
          <el-input v-model="value2" placeholder="YYYY-MM-DD"/>
        </el-col>
        <el-col :span="6">
          <el-button @click="getReports">Get Reports</el-button>
        </el-col>
      </el-row>
      <!-- <el-row>
        <panel-group @handleSetLineChartData="handleSetLineChartData"/>
      </el-row>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData"/>
      </el-row> -->
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <!-- <box-card /> -->
        <div>
          <el-button v-for="item in reports" :key="item.id" type="text" class="button" @click="displayData(item)">{{ item.name }}</el-button>
        </div>
      </el-row>
      <el-row >
        <el-card>
          <span >
            <table>
              <tr>
                <th>Total Links: </th>
                <th>Search Result: </th>
                <th>Total Adwords: </th>
                <th>Date: </th>
              </tr>
              <tr v-for="i in dataR.reports" :key="i.id">
                <td>{{ (JSON.parse(i.report_data)).totalLinks }}</td>
                <td>{{ (JSON.parse(i.report_data)).searchResult }} </td>
                <td>{{ (JSON.parse(i.report_data)).totalAddWords }} </td>
                <td> {{ i.created_at }} </td>
              </tr>
            </table>
          </span>
        </el-card>
      </el-row>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData"/>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from './components/LineChart'
import BoxCard from './components/BoxCard'
import PanelGroup from './components/PanelGroup'

const lineChartData = {
  newVisitis: {
    addwords: [100, 120, 161, 134, 105, 160, 165],
    links: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    addwords: [200, 192, 120, 144, 160, 130, 140],
    links: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    addwords: [80, 100, 121, 104, 105, 90, 100],
    links: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    addwords: [130, 140, 141, 142, 145, 150, 160],
    links: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  components: {
    PanelGroup,
    LineChart,
    BoxCard
  },
  mixins: [],
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      linkToDownload: 'http://localhost:8000/api/file?file_path=public/tmp/1/1551559174firstOne.csv',
      form: {
        name: '',
        master_campaigns_id: '',
        user_id: '',
        desc: '',
        fileList: []
      },
      masterCampaignList: [{
        'name': 'Goggle',
        'logo': 'https://lh3.googleusercontent.com/NGPrjka2ai0w7sfhxkxCwtOSh2wVyEZMdtrVxI4vrA22ebA_fcyl9PSvhTaCYXSWh0A68ZhvXhVZ4U-Nnp3v9IfoXg5o5H1tjjK97cs',
        'id': 1
      },
      {
        'name': 'Dribble',
        'logo': 'https://mondrian.mashable.com/2013%252F05%252F14%252F4a%252Fdribbble357.69c94.jpg%252F950x534__filters%253Aquality%252890%2529.jpg?signature=gASlUVR0zTlpgI3R4oK3pCNKqAM=',
        'id': 2
      }],
      value: '{"id": 21,"direction":"Login"}',
      showQR: false,
      showLoader: false,
      dialog: true,
      titleData: 'Create Campaign',
      dialogVisible: false,
      UPLOAD: '',
      validationMessage: '',
      isReportBoxOpen: false,
      value2: '',
      value1: '',
      currentDate: '',
      dataR: '',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: 'Today',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: 'Yesterday',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: 'A week ago',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'campaigns', 'reports'
    ])
  },
  mounted() {
    if (this.$store.getters.user_id !== '') {
      this.$store.dispatch('getCampaignList', this.$store.getters.user_id)
        .then(res => {

        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  methods: {
    getLogo(o) {
      return this.masterCampaignList[0].logo
    },
    showReport(o) {
      this.isReportBoxOpen = true
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    showHideDialog(cond) {
      return new Promise((resolve, reject) => {
        this.showLoader = cond
        this.dialogVisible = cond
        resolve()
      })
    },
    onSubmit() {
      // this.getAllHashes();
      // return
      const price_file = document.querySelector('#workflow_data_template')
      const formData = new FormData()

      const file = price_file.files[0]
      if (file) {
        formData.append('file_name', price_file.files[0])
        formData.append('master_campaigns_id', this.form.master_campaigns_id)
        formData.append('name', this.form.name)
        formData.append('user_id', this.$store.getters.user_id)
        formData.append('team_id', this.$store.getters.team_id)
        this.$store.dispatch('newCampaign', formData).then(() => {
          this.$store.dispatch('getCampaignList', this.$store.getters.user_id)
            .then(res => {
              this.dialogVisible = false
            })
            .catch(err => {
              console.log(err)
            })
        }).catch((err) => {
          console.log(err)
          alert(err)
          // this.loading = false
        })
      } else {
        alert('No File selected')
      }
    },
    addAttachment(file, fileList) {
      this.form.fileList.push(file)
    },
    deleteAttachment() {
      // removes from array
    },
    handlePreview() {
      //
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    // get Reports
    getReports() {
      if (this.value1 === '') {
        alert('From Date Missing')
      } else if (this.value2 === '') {
        alert('To Date Missing')
      } else {
        const form = {
          'from_date': this.value1,
          'to_date': this.value2,
          'user_id': this.$store.getters.user_id
        }
        this.$store.dispatch('getReports', form)
          .then(res => {

          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    displayData(item) {
      this.dataR = item
      console.log(this.dataR)
    }
  }

}
</script>

<style scoped lang="scss">
.datepicker{ z-index:99999 !important; }
.el-close{
    float:right;
    height:50px;
    padding-right:10px;
    padding-top:10px;
}
.el-report-box{
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    z-index: 9999;
    /* border: solid #999; */
    background: #f5f7fa;
    box-shadow: -5px 1px 4px rgba(0,0,0,.12);
}

.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: right;
    line-height: 60px;
}
.line{
  text-align: center;
}
.content-upload-form{
  padding:10px;
}

.not-started {
  padding: 5px;
  font-size: x-large;
  color: gray
}

.started {
  padding: 5px;
  font-size: x-large;
  color:black
}
.success {
  padding: 5px;
  font-size: x-large;
  color : green
}
</style>
