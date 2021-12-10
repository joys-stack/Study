<!--
@Author DZY
@Description 系统升级日志
@CreateDate 2020-12-22
@ModifyAuthor
@ModifyDate
@ModifyDescription
-->
<template>
  <div class="update">
    <div class="head">
      <img
        src="../../assets/images/logo.png"
        alt=""
      >
      <span>浙江省血液中心临床输血服务信息平台-更新日志</span>
    </div>
    <div class="main">
      <a-timeline class="TimeLine">
        <a-timeline-item>
          <a-icon
            slot="dot"
            type="clock-circle-o"
            style="font-size: 16px;"
          />
          <h2>2021-11-30 18:00</h2>
          <a-card>
            <p>1、智慧人事-增加财务增发系数录入功能。</p>
            <p>2、智慧人事-增加财务科绩效数据审核功能。</p>
          </a-card>
        </a-timeline-item>
        <a-timeline-item>
          <a-icon
            slot="dot"
            type="clock-circle-o"
            style="font-size: 16px;"
          />
          <h2>2021-11-23 18:00</h2>
          <a-card>
            <p>1、智慧财务-调整首页图片以及显示大小。</p>
          </a-card>
        </a-timeline-item>
        <a-timeline-item>
          <a-icon
            slot="dot"
            type="clock-circle-o"
            style="font-size: 16px;"
          />
          <h2>2021-11-09 18:00</h2>
          <a-card>
            <p>1、智慧管理-增加智慧财务首页、智慧后勤首页、行政办公首页。</p>
            <p>2、智慧管理-将“绩效工资系统”改名为“智慧人事”，“行政办公系统”改名为“智慧办公”，“科研经费管理”改名为“智慧财务”，“后勤管理系统”改名为“智慧后勤”，“综合档案系统”改名为“电子档案”，新增“电子图书馆”应用。</p>
            <p>3、数据共享平台-修复查询选择页条数无效的问题。</p>
            <p>4、智慧人事-将功能点“专项薪酬项目录入”改为“专项薪酬项目维护”，“零星薪酬数据查询”移动到“查询统计”菜单下。</p>
          </a-card>
        </a-timeline-item>
        <a-timeline-item>
          <a-icon
            slot="dot"
            type="clock-circle-o"
            style="font-size: 16px;"
          />
          <h2>2021-07-05 17:30</h2>
          <a-card>
            <p>1、血液管理-系统功能菜单改为竖向排列。</p>
            <p>2、血液管理-调整了血液预约申请界面，支持点击“预约”后，在弹窗中输入预约相关信息。</p>
            <p>3、血液管理-取消了【预约删除】功能菜单，支持在血液预约界面直接取消预约记录。</p>
            <p>4、临床检测-为了满足ISO15189医学实验室质量和能力认可准则，我们调整了临床检测项目申请表单样式，包括血小板交叉配型、基因配型、疑难血型鉴定、孕妇血型血清检查、新生儿溶血症筛查。</p>
            <p>5、临床检测-临床检测业务增加了审核环节，即血小板交叉配型、基因配型、疑难血型鉴定、孕妇血型血清检查、新生儿溶血症筛查申请单必须经医院输血科审核后，血站才能受理相应业务。</p>
            <p>6、系统管理-对临床质控指标上报功能进行了优化。</p>
            <p>7、系统管理-对授权管理相关功能进行了优化，相关操作可参考《临床输血服务信息平台操作手册V2.0（医院端）-20210702》中的“6.2组织管理”、“6.3授权管理”。</p>
          </a-card>
        </a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="css" scoped>
.update {
  background-color: #fff;
  z-index: -1;
  height: 100%;
}

.head {
  height: 80px;
  padding-left: 20px;
  line-height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgb(218, 220, 224);
}

.head img {
  display: inline-block;
}

.head span {
  display: inline-block;
  font-size: 25px;
  margin-left: 10px;
}

.main {
  height: calc(100% - 80px);
  background-color: #fff;
  padding-top: 30px;
  overflow: auto;
}

h2 {
  font-size: 16px;
  color: rgb(136, 153, 170);
  font-weight: 700;
}

.TimeLine {
  margin: 0 300px;
  overflow-y: auto;
}

.TimeLine >>> .ant-timeline-item-tail {
  left: 9px;
}

.TimeLine >>> .ant-timeline-item-content {
  margin-left: 30px;
  top: -3px;
}

.TimeLine >>> .ant-timeline-item-head-custom {
  top: 7.5px;
  left: 9px !important;
}

.TimeLine >>> .ant-timeline-item-head {
  left: 5px;
}

p {
  font-size: 16px;
  line-height: 36px;
  margin-bottom: 0;
}
</style>
