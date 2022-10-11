<!--
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-08-05 14:31:12
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-27 16:40:25
 * @FilePath: \yjxt-web\src\components\dialog\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="dialogindex">
    <!-- <div class="button">
      <el-button type="primary" @click="aaa">主要按钮</el-button>
    </div> -->
    <!-- 新增修改 -->
    <el-dialog
      :title="dialogTitle"
      width="650px"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="addFormClose('addForm')"
    >
      <el-form
        ref="addForm"
        :model="formadd"
        label-position="right"
        label-width="120px"
        size="mini"
        :rules="addFormRules"
      >
        <el-form-item label="所属分类" prop="menuValue">
          {{ formadd.menuValue }}
        </el-form-item>
        <!-- <el-form-item label="品牌" prop="brand">
          <el-input v-model="formadd.brand" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-input
            v-model="formadd.model"
            style="width: 400px"
            @blur="queryTuijianYJ('formadd')"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="保养内容" prop="proName">
          <el-input v-model="formadd.proName" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="设定寿命" required v-if="dialogTitle !== '修改'">
          <div style="display: flex">
            <el-form-item prop="lifeValue" style="width: 200px">
              <!-- <el-input v-model="form.lifeValue"></el-input> -->
              <el-input-number
                style="width: 200px"
                :min="1"
                :max="1000000"
                v-model="formadd.lifeValue"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
            <el-form-item prop="unit" style="width: 200px">
              <el-select v-model="formadd.unit" style="width: 200px">
                <el-option label="工作次数" value="工作次数"> </el-option>
                <el-option label="通电小时" value="通电小时"> </el-option>
                <el-option label="工作小时" value="工作小时"> </el-option>
                <el-option label="自然日" value="自然日"> </el-option>
              </el-select>
            </el-form-item>
            <el-popover
              placement="right"
              trigger="click"
              v-if="formadd.unit === '自然日'"
            >
              <div style="width: 400px">
                <el-calendar v-model="value"> </el-calendar>
              </div>

              <el-button slot="reference" icon="el-icon-date"></el-button>
              <!-- <i class="el-icon-date" slot="reference"></i> -->
            </el-popover>
          </div>
        </el-form-item>
        <!-- <el-form-item label="采购周期" required v-if="dialogTitle !== '修改'">
          <div style="display: flex">
            <el-form-item prop="shopTime" style="width: 200px">
              <el-input-number
                style="width: 200px"
                :min="1"
                :max="300"
                v-model="formadd.shopTime"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
            <el-form-item prop="shopTimeType">
              <el-select v-model="formadd.shopTimeType" style="width: 200px">
                <el-option label="工作日" value="工作日"> </el-option>
                <el-option label="自然日" value="自然日"> </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form-item> -->
        <el-form-item
          label="预警值"
          prop="yujingValue"
          v-if="dialogTitle !== '修改'"
        >
          <div style="display: flex">
            <!-- <el-input
              v-model="form.yujingValue"
              style="width: 400px"
            ></el-input> -->
            <el-input-number
              style="width: 400px"
              :min="1"
              :max="1000000"
              v-model="formadd.yujingValue"
              controls-position="right"
            ></el-input-number>
          </div>
        </el-form-item>
        <!-- <el-form-item
          label="推荐预警值"
          :key="formadd.recommend"
          v-if="dialogTitle !== '修改'"
        >
          <span v-if="formadd.recommend > 0">历史同型号单日消耗</span>
          <span v-if="formadd.recommend > 0">{{ formadd.recommend }}</span>
        </el-form-item> -->
        <el-form-item
          label="PLC设备"
          prop="plcSetUp"
          v-if="formadd.unit !== '自然日'"
        >
          <div style="display: flex">
            <el-input
              v-model="formadd.plcSetUpVal"
              disabled
              placeholder="请设置读取PLC"
              style="width: 400px"
            ></el-input>
            <el-button @click="setUp">设置</el-button>
          </div>
        </el-form-item>
        <el-form-item label="图片" prop="imgPath">
          <div style="display: flex" :key="imgKey">
            <div
              v-if="formadd.imgPath !== ''"
              style="width: 100px; margin-right: 10px"
            >
              <img
                :src="formadd.imgPath"
                alt=""
                style="width: 100px; height: 100px"
              />
            </div>
            <el-popover placement="top-start" width="400" trigger="hover">
              <div class="imgList">
                <div v-for="(v, i) in imgList" :key="i" @click="imgUrlClick(i)">
                  <img :src="v" alt="" />
                </div>
              </div>
              <div
                slot="reference"
                :style="{
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  'align-items': 'center',
                  'justify-content': 'center',
                  'font-size': '40px',
                  border: '1px dashed #DCDFE6',
                  cursor: 'pointer',
                }"
                @click="uploadClick"
              >
                <i class="el-icon-plus"></i>
              </div>
            </el-popover>
          </div>
        </el-form-item>

        <el-form-item :label="'报警通知'" prop="notice">
          <el-checkbox-group v-model="formadd.notice">
            <el-checkbox
              :label="v.userID"
              v-for="(v, i) in noticeOption"
              :key="i"
              >{{ v.userName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          style="width: 400px"
          label="备注"
          v-if="dialogTitle !== '添加保养预警项' && dialogTitle !== '修改'"
          prop="remarks"
        >
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="formadd.remarks"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addList('addForm')">提交</el-button>
      </div>
    </el-dialog>
    <!-- 处理预警 -->
    <el-dialog
      :close-on-click-modal="false"
      title="维保设备"
      width="700px"
      :visible.sync="handleDialogFormVisible"
      @closed="weibaoClose('handleForm')"
    >
      <el-form
        ref="handleForm"
        :model="handleFormtwo"
        label-position="right"
        label-width="120px"
        size="mini"
        :rules="handleFormRules"
      >
        <el-form-item label="所属分类">
          {{ handleFormtwo.menuValue }}
        </el-form-item>
        <el-form-item label="设备名称">
          {{ handleFormtwo.proName }}
        </el-form-item>
        <el-form-item label="设定寿命" required>
          <div style="display: flex">
            <el-form-item prop="lifeValue" style="width: 200px">
              <el-input-number
                style="width: 200px"
                v-model="handleFormtwo.lifeValue"
                :min="lifeValue"
                :max="1000000"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
            <el-form-item prop="unit" style="width: 200px">
              <el-select v-model="handleFormtwo.unit" style="width: 200px">
                <el-option label="工作次数" value="工作次数"> </el-option>
                <el-option label="通电小时" value="通电小时"> </el-option>
                <el-option label="工作小时" value="工作小时"> </el-option>
                <el-option label="自然日" value="自然日"> </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="预警值" prop="yujingValue">
          <div style="display: flex">
            <el-input-number
              v-model="handleFormtwo.yujingValue"
              style="width: 400px"
              :min="yujingValue"
              :max="handleFormtwo.lifeValue * 1"
              controls-position="right"
            ></el-input-number>
          </div>
        </el-form-item>
        <el-form-item label="本次维保人" prop="notice">
          <el-select v-model="handleFormtwo.notice" style="width: 400px">
            <el-option
              :label="v.userName"
              :value="v.userID"
              v-for="(v, i) in noticeOption"
              :key="i"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            style="width: 400px"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="handleFormtwo.remarks"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="weibaoClick('handleForm')"
          >提交</el-button
        >
      </div>
    </el-dialog>
    <!-- 设置plc -->
    <el-dialog
      title="设置plc"
      width="500px"
      :close-on-click-modal="false"
      :visible.sync="setUpPlcDialog"
      @closed="plcSetUpClick('plcSetUpForm')"
    >
      <el-form
        ref="plcSetUpForm"
        :model="plcForm"
        label-position="right"
        label-width="140px"
        size="mini"
        :rules="plcSetUpDialogRules"
      >
        <!-- plc名称 -->
        <el-form-item label="plc名称" prop="plcID">
          <div style="display: flex">
            <el-select v-model="plcForm.plcID" style="width: 200px">
              <el-option
                :label="v.PLC_name"
                :value="v.plcID"
                v-for="(v, i) in plcOption"
                :key="i"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <!-- plc读地址 -->
        <el-form-item label="plc读地址" prop="PLC_adress">
          <el-input
            v-model="plcForm.PLC_adress"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <!-- 数据类型 -->
        <el-form-item label="数据类型" prop="PLC_addressType">
          <div style="display: flex">
            <el-select
              style="width: 200px"
              v-model="plcForm.PLC_addressType"
              @change="plcForm.chufa = ''"
            >
              <el-option label="int16" value="int16"> </el-option>
              <el-option label="Dint32" value="Dint32"> </el-option>
              <el-option label="Uint16" value="Uint16"> </el-option>
              <el-option label="UDint32" value="UDint32"> </el-option>
              <el-option label="real" value="real"> </el-option>
              <el-option label="bool" value="bool"> </el-option>
              <el-option label="string" value="string"> </el-option>
            </el-select>
          </div>
        </el-form-item>
        <!-- 数据长度 -->
        <el-form-item label="数据长度" prop="addressLenth">
          <el-input
            v-model="plcForm.addressLenth"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <!-- 触发数据读取 -->
        <el-form-item label="触发数据读取" prop="chufa">
          <el-select
            style="width: 200px"
            v-model="plcForm.chufa"
            v-if="
              plcForm.PLC_addressType !== 'string' &&
              plcForm.PLC_addressType !== 'bool' &&
              plcForm.PLC_addressType !== 'real'
            "
          >
            <el-option label="数据不为空" value="1"> </el-option>
            <el-option label="与上一次不同" value="2"> </el-option>
            <el-option label="指定信号" value="3"> </el-option>
          </el-select>
          <el-select
            style="width: 200px"
            v-model="plcForm.chufa"
            v-if="plcForm.PLC_addressType === 'bool'"
          >
            <el-option label="等于true" value="4"> </el-option>
            <el-option label="等于false" value="5"> </el-option>
            <el-option label="指定信号" value="3"> </el-option>
          </el-select>
          <el-select
            style="width: 200px"
            v-model="plcForm.chufa"
            v-if="
              plcForm.PLC_addressType === 'string' &&
              plcForm.PLC_addressType === 'real' &&
              plcForm.PLC_addressType !== ''
            "
          >
            <el-option label="数据不为空" value="1"> </el-option>
            <el-option label="与上一次不同" value="2"> </el-option>
            <el-option label="指定信号" value="3"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 指定信号读取条件 -->
        <el-form-item
          label="指定信号读取条件"
          v-if="plcForm.chufa === '3'"
          required
        >
          <div style="display: flex">
            <el-form-item prop="where_PLC_address" style="width: 140px">
              <el-input v-model="plcForm.where_PLC_address"></el-input>
            </el-form-item>
            <el-form-item prop="where_tiaojian" style="width: 140px">
              <el-select v-model="plcForm.where_tiaojian">
                <el-option label="<" value="<"> </el-option>
                <el-option label="=" value="="> </el-option>
                <el-option label=">" value=">"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="where_content" style="width: 140px">
              <el-input
                v-if="plcForm.where_tiaojian === '='"
                v-model="plcForm.where_content"
              ></el-input>
              <el-input-number
                v-else
                v-model="plcForm.where_content"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
          </div>
          <div style="display: flex; justify-content: space-around; color: red">
            <div style="width: 100px; text-align: center">例：D100</div>
            <div style="width: 100px; text-align: center">=</div>
            <div style="width: 100px; text-align: center">1</div>
          </div>
        </el-form-item>
        <!-- 指定信号读取类型 -->
        <el-form-item
          label="指定信号读取类型"
          v-if="plcForm.chufa === '3'"
          prop="PLC_adress"
        >
          <div style="display: flex">
            <el-select v-model="plcForm.PLC_addressType1" style="width: 200px">
              <el-option label="int16" value="int16"> </el-option>
              <el-option label="Dint32" value="Dint32"> </el-option>
              <el-option label="Uint16" value="Uint16"> </el-option>
              <el-option label="UDint32" value="UDint32"> </el-option>
              <el-option label="real" value="real"> </el-option>
              <el-option label="bool" value="bool"> </el-option>
              <el-option label="string" value="string"> </el-option>
            </el-select>
          </div>
        </el-form-item>
        <!-- 指定信号读取类型 -->
        <el-form-item
          label="指定信号回写"
          v-if="plcForm.chufa === '3'"
          prop="where_returnVal"
        >
          <el-input
            v-model="plcForm.where_returnVal"
            style="width: 200px"
          ></el-input>
          <div style="color: red">不需要回写请留空</div>
        </el-form-item>
        <!-- 读取后的数据处理 -->
        <el-form-item label="读取后的数据处理" prop="chuli">
          <el-select
            v-model="plcForm.chuli"
            v-if="plcForm.PLC_addressType !== 'bit'"
            :style="plcForm.chuli === '累加' ? 'width: 100px' : 'width: 200px'"
          >
            <el-option label="累加" value="累加"> </el-option>
            <el-option label="替换" value="替换"> </el-option>
          </el-select>
          <el-select v-model="plcForm.chuli" v-else>
            <el-option label="累加" value="累加"> </el-option>
          </el-select>
          <el-select
            v-model="plcForm.chuliType"
            v-if="plcForm.chuli === '累加'"
            :style="plcForm.chuli === '累加' ? 'width: 100px' : 'width: 200px'"
          >
            <el-option label="直接累加" value="1"> </el-option>
            <el-option label="每次加1" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 读取成功后回写 -->
        <el-form-item label="读取成功后回写" prop="returnVal">
          <el-input v-model="plcForm.returnVal" style="width: 200px"></el-input>
          <div style="color: red">读取成功后回写数据，不需要回写请留空</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setUpPlcClick('plcSetUpForm')"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
    // [Button.name]: Button // 此处是引入组件名字的方法
  },
  props: {
    // 添加、修改对话框标题
    dialogTitle: {
      type: String,
      default: "添加保养预警项",
    },
    // 添加修改表单数据
    form: {
      type: Object,
      default: () => {
        return {
          menuValueID: "",
          brand: "",
          model: "",
          proName: "",
          lifeValue: "",
          unit: "",
          shopTime: "",
          shopTimeType: "",
          yujingValue: "",
          imgPath: "",
          plcSetUp: "",
          notice: [],
          menuValue: "",
        };
      },
    },
    // 处理预计表单数据
    handleForm: {
      type: Object,
      default: () => {
        return { notice: [] };
      },
    },
    // 设置plc表单
    plcForm: {
      type: Object,
      default: () => {
        return {
          plcID: "",
          PLC_adress: "",
          PLC_addressType: "",
          addressLenth: "",
          chufa: "",
          where_PLC_address: "",
          where_tiaojian: "",
          where_content: "",
          returnVal: "",
          chuli: "",
          PLC_addressType1: "",
        };
      },
    },
    // plc数据集合
    plcOption: {
      type: Array,
    },
  },
  data() {
    var yujingValue = (rule, value, callback) => {
      if (value < this.handleFormtwo.DValue) {
        callback(new Error("预警值不可小于当前值"));
      } else {
        callback();
      }
    };
    return {
      // 人员下拉数据集合
      noticeOption: [],
      formNotice: [],
      // 添加、修改对话框开关
      dialogFormVisible: false,
      formadd: {},
      addFormRules: {
        menuValue: [
          {
            required: true,
            message: "所属分类不能为空",
            trigger: ["blur", "change"],
          },
        ],
        brand: [
          {
            required: true,
            message: "品牌不能为空",
            trigger: ["blur", "change"],
          },
        ],
        model: [
          {
            required: true,
            message: "型号不能为空",
            trigger: ["blur", "change"],
          },
        ],
        proName: [
          {
            required: true,
            message: "设备名称不能为空",
            trigger: ["blur", "change"],
          },
        ],
        lifeValue: [
          {
            required: true,
            message: "设定寿命不能为空",
            trigger: ["blur", "change"],
          },
        ],
        unit: [
          {
            required: true,
            message: "设定寿命类型不能为空",
            trigger: ["blur", "change"],
          },
        ],
        shopTime: [
          {
            required: true,
            message: "采购周期不能为空",
            trigger: ["blur", "change"],
          },
        ],

        shopTimeType: [
          {
            required: true,
            message: "采购周期类型不能为空",
            trigger: ["blur"],
          },
        ],
        yujingValue: [
          {
            required: true,
            message: "所属分类不能为空",
            trigger: ["blur", "change"],
          },
        ],
        plcSetUp: [
          {
            required: true,
            message: "当前预警值获取不能为空",
            trigger: ["blur", "change"],
          },
        ],
        imgPath: [
          {
            required: true,
            message: "图片不能为空",
            trigger: ["blur", "change"],
          },
        ],
        notice: [
          {
            required: true,
            message: "报警通知人不能为空",
            trigger: ["blur"],
          },
        ],
      },
      // 处理预警对话框开关
      handleDialogFormVisible: false,
      handleFormtwo: {},
      // 维保设备表单校验
      handleFormRules: {
        lifeValue: [
          {
            required: true,
            message: "设定寿命不能为空",
            trigger: ["blur", "change"],
          },
        ],
        unit: [
          {
            required: true,
            message: "设定寿命类型不能为空",
            trigger: ["blur", "change"],
          },
        ],
        yujingValue: [
          {
            required: true,
            message: "预警值不能为空",
            trigger: ["blur", "change"],
          },
          { validator: yujingValue, trigger: "blur" },
        ],
        notice: [
          {
            required: true,
            message: "本次维保人不能为空",
            trigger: ["blur", "change"],
          },
        ],
        remarks: [
          {
            required: true,
            message: "备注不能为空",
            trigger: ["blur", "change"],
          },
        ],
      },
      // 设置plc对话框开关
      setUpPlcDialog: false,
      // plc设置表单校验数据
      plcSetUpDialogRules: {
        plcID: [
          {
            required: true,
            message: "plc名称不能为空",
            trigger: ["blur", "change"],
          },
        ],
        PLC_adress: [
          {
            required: true,
            message: "plc读地址不能为空",
            trigger: ["blur", "change"],
          },
        ],
        PLC_addressType: [
          {
            required: true,
            message: "数据类型不能为空",
            trigger: ["blur", "change"],
          },
        ],
        addressLenth: [
          {
            required: true,
            message: "数据长度不能为空",
            trigger: ["blur", "change"],
          },
        ],
        chufa: [
          {
            required: true,
            message: "触发数据读取不能为空",
            trigger: ["blur", "change"],
          },
        ],
        plcIwhere_PLC_addressD: [
          {
            required: true,
            message: "地址不能为空",
            trigger: ["blur", "change"],
          },
        ],
        where_tiaojian: [
          {
            required: true,
            message: "条件不能为空",
            trigger: ["blur", "change"],
          },
        ],
        where_content: [
          {
            required: true,
            message: "值不能为空",
            trigger: ["blur", "change"],
          },
        ],
        PLC_addressType1: [
          {
            required: true,
            message: "指定信号读取类型不能为空",
            trigger: ["blur", "change"],
          },
        ],
        chuli: [
          {
            required: true,
            message: "读取后的数据处理不能为空",
            trigger: ["blur", "change"],
          },
        ],
        where_returnVal: [
          {
            required: true,
            message: "指定信号回写不能为空",
            trigger: ["blur", "change"],
          },
        ],
      },
      //已有图片集合
      imgList: [
        require("../../assets/sucai/602a7f8fe0e7d.jpg"),
        require("../../assets/sucai/6030ed8d253df.jpg"),
        require("../../assets/sucai/173335.jpg"),
        require("../../assets/sucai/173353.jpg"),
        require("../../assets/sucai/173355.jpg"),
        require("../../assets/sucai/275314.jpg"),
        require("../../assets/sucai/400244.jpg"),
        require("../../assets/sucai/401804.jpg"),
        require("../../assets/sucai/815606.jpg"),
        require("../../assets/sucai/1429307.jpg"),
        require("../../assets/sucai/1580190.jpg"),
        require("../../assets/sucai/1829653.jpg"),
        // require("../../assets/sucai/pki581418.jpg"),
        // require("../../assets/sucai/pki581418.jpg"),
        // require("../../assets/sucai/pki581418.jpg"),
      ],
      lifeValue: 0,
      yujingValue: 0,
      imgKey: 0,
      value: new Date(),
    };
  },
  watch: {
    dialogFormVisible: {
      immediate: false,
      handler: function (v) {
        if (v) {
          this.formadd = JSON.parse(JSON.stringify(this.form));
        } else {
          this.formadd = {
            menuValueID: "",
            brand: "",
            model: "",
            proName: "",
            lifeValue: "",
            unit: "",
            shopTime: "",
            shopTimeType: "",
            yujingValue: "",
            imgPath: "",
            plcSetUp: "",
            notice: [],
            menuValue: "",
          };
        }
      },
    },
    handleDialogFormVisible: {
      immediate: false,
      handler: function (v) {
        if (v) {
          this.lifeValue = this.handleForm.lifeValue * 1;
          this.yujingValue = this.handleForm.yujingValue * 1;
          this.handleFormtwo = JSON.parse(JSON.stringify(this.handleForm));
        } else {
          this.lifeValue = 0;
          this.yujingValue = 0;
          this.handleFormtwo = {};
        }
      },
    },
    value: {
      immediate: false,
      handler: function (v) {
        let startDate = new Date().getTime();
        let endDate = v.getTime();
        if (startDate > endDate) {
          this.formadd.lifeValue = 0;
        }
        if (startDate === endDate) {
          this.formadd.lifeValue = 1;
        }
        const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
        this.formadd.lifeValue = days.toFixed(0);
        console.log("this.formadd.lifeValue: ", this.formadd.lifeValue);
        console.log("v: ", v.getTime());
      },
    },
  },
  created() {},
  mounted() {
    this.queryUserList();
  },
  methods: {
    // async aaa() {
    //   let y = Math.floor(Math.random() * 12);
    //   let i = sessionStorage.getItem("aaa");
    //   let res = null;
    //   let arr = [
    //     1,
    //     "D" + i + "00",
    //     "int16",
    //     "1",
    //     "2",
    //     "",
    //     "",
    //     "",
    //     "",
    //     "替换",
    //     "",
    //     undefined,
    //   ];
    //   // eslint-disable-next-line no-undef
    //   res = await frmKuchun.plc_list_add(arr);
    //   console.log("res: ", res, arr);
    //   // eslint-disable-next-line no-unused-vars
    //   let proList = [
    //     4,
    //     "a",
    //     "b",
    //     "D" + i + "00-不一致-替换",
    //     100,
    //     "工作次数",
    //     1,
    //     "工作日",
    //     80,
    //     // "img/6030ed8d253df.dd6ef686.jpg",
    //     this.imgList[y],
    //     res,
    //   ];
    //   // eslint-disable-next-line no-undef
    //   let res1 = await frmKuchun.listAdd(proList, "1");
    //   if (res1.data) {
    //     sessionStorage.setItem("aaa", i * 1 + 1);
    //     this.$store.commit("setrefresh", { bool: true, name: "form" });
    //   }
    //   console.log("res1: ", proList);
    // },
    // 人员查询
    async queryUserList() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.queryUserList();

      if (res.code === "1") {
        this.noticeOption = res.data;
      }
    },
    // 选中已有图片
    imgUrlClick(i) {
      this.formadd.imgPath = this.imgList[i];
      this.imgKey++;
    },
    // 选择自己上传图片
    async uploadClick() {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.uploadImg();

      this.formadd.imgPath = res;
    },
    async queryTuijianYJ(v) {
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.tuijianYJ(this[v].model, this[v].menuValueID);
      console.log("res: ", res);
      this[v].recommend = res;
      console.log("this[v]: ", this[v]);
    },
    // 添加、修改提交
    addList(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          if (this.dialogTitle === "添加保养预警项") {
            let proList = [
              this.formadd.menuValueID,
              "",
              "",
              this.formadd.proName,
              this.formadd.lifeValue,
              this.formadd.unit,
              0,
              "",
              this.formadd.yujingValue,
              this.formadd.imgPath,
              this.formadd.plcSetUp,
            ];
            console.log(
              'proList,this.formadd.notice.join(","): ',
              proList,
              this.formadd.notice.join(",")
            );
            // eslint-disable-next-line no-undef
            res = await frmKuchun.listAdd(
              proList,
              this.formadd.notice.join(",")
            );
          } else if (this.dialogTitle === "修改") {
            let proList = [
              this.formadd.menuValueID,
              "",
              "",
              this.formadd.proName,
              0,
              "",
              this.formadd.imgPath,
              this.formadd.proID,
              this.formadd.plcSetUp,
            ];
            console.log(proList, this.formadd.notice.join(","));
            // eslint-disable-next-line no-undef
            res = await frmKuchun.proEdit(
              proList,
              this.formadd.notice.join(",")
            );
            console.log("res: ", res);
          } else {
            let proList = [
              this.formadd.menuValueID,
              this.formadd.brand,
              this.formadd.model,
              this.formadd.proName,
              this.formadd.lifeValue,
              this.formadd.unit,
              this.formadd.shopTime,
              this.formadd.shopTimeType,
              this.formadd.yujingValue,
              this.formadd.imgPath,
              this.formadd.remarks,
              this.formadd.proID,
              this.formadd.plcSetUp,
              this.formadd.MID,
            ];

            // eslint-disable-next-line no-undef
            res = await frmKuchun.listWeibaoAdd2(
              proList,
              this.formadd.notice.join(",")
            );
          }
          console.log("res: ", res);
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    //添加、修改关闭的回调
    addFormClose(formName) {
      this.$store.commit("setrefresh", { bool: true, name: "form" });
      this.$refs[formName].resetFields();
    },
    //设置plc按钮
    async setUp() {
      if (
        this.formadd.plcSetUp !== "" &&
        this.formadd.plcSetUp !== null &&
        this.formadd.plcSetUp !== undefined
      ) {
        // 查询plc数据
        let res2 = null;
        // eslint-disable-next-line no-undef
        res2 = await frmKuchun.plc_listList(this.formadd.plcSetUp * 1);
        console.log("res2: ", res2);
        this.plcForm = res2.data[0];
        this.plcForm.chufa += "";
        this.plcForm.chuliType = this.plcForm.chuliType + "";
        this.plcForm.PLC_addressType1 = res2.data[0].where_PLC_addressType;
      }
      this.setUpPlcDialog = true;
    },
    // 设置plc提交
    setUpPlcClick(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          let arr = [
            this.plcForm.plcID,
            this.plcForm.PLC_adress,
            this.plcForm.PLC_addressType,
            this.plcForm.addressLenth,
            this.plcForm.chufa,
            this.plcForm.where_PLC_address,
            this.plcForm.where_tiaojian,
            this.plcForm.where_content,
            this.plcForm.returnVal,
            this.plcForm.chuli,
            this.plcForm.PLC_addressType1,
            this.plcForm.where_returnVal,
            this.plcForm.chuliType,
            "1",
          ];
          // eslint-disable-next-line no-undef
          res = await frmKuchun.plc_list_add(arr);
          console.log("arr: ", arr);

          this.formadd.plcSetUpVal = "";
          for (let i = 0; i < this.plcOption.length; i++) {
            if (this.plcOption[i].plcID === this.plcForm.plcID) {
              this.formadd.plcSetUpVal +=
                this.plcOption[i].PLC_ip +
                "-" +
                this.plcForm.PLC_adress +
                "-" +
                this.plcForm.PLC_addressType;
            }
          }
          this.formadd.plcSetUp = res;
          this.setUpPlcDialog = false;
        } else {
          return false;
        }
      });
    },
    // 设置plc关闭的回调
    plcSetUpClick(formName) {
      this.$refs[formName].resetFields();
    },
    //维保提交
    async weibaoClick(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          let proList = [
            this.handleFormtwo.proID,
            this.handleFormtwo.lifeValue,
            this.handleFormtwo.unit,
            this.handleFormtwo.yujingValue,
            "已维保设备",
            this.handleFormtwo.remarks,
            this.handleFormtwo.MID,
          ];

          // eslint-disable-next-line no-undef
          res = await frmKuchun.listWeibaoAdd(
            proList,
            this.handleFormtwo.notice
          );
          if (res.data) {
            this.handleDialogFormVisible = false;
          }
        } else {
          return false;
        }
      });
    },
    weibaoClose(formName) {
      this.$refs[formName].resetFields();
      this.$store.commit("setrefresh", { bool: true, name: "handleForm" });
    },
  },
};
</script>

<style  lang="scss">
.dialogindex {
  .button {
    position: absolute;
    top: 0px;
  }
  .el-dialog {
    .el-form {
      .el-form-item {
        margin-bottom: 10px !important;
      }
    }
  }
}
.imgList {
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 10px;
    border: 1px solid #fff;
  }
  > div:hover {
    border: 1px solid #409eff;
  }
  img {
    width: 100px;
    height: 100px;
  }
}
.el-calendar {
  width: 400px;
  height: 360px;
  .el-calendar-day {
    height: 35px !important;
  }
}
</style>
