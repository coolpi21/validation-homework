<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><router-link :to="{ name: 'login' }">登入</router-link></li>
          <li class="layui-this">注册</li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0;"
        >
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">用户名</label>
                  <div class="layui-input-inline">
                    <ValidationProvider rules="required|email" name="邮箱" v-slot="{ errors }">
                      <input
                        type="text"
                        id="L_email"
                        autocomplete="off"
                        class="layui-input"
                        v-model="username"
                      />
                      <span class="error">{{errors[0]}}</span>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-mid layui-word-aux">
                    将会成为您唯一的登入名
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_username" class="layui-form-label">昵称</label>
                  <div class="layui-input-inline">
                    <ValidationProvider rules="required|min:4" name="昵称" v-slot="{errors}">
                      <input
                        type="text"
                        id="L_username"
                        name="username"
                        autocomplete="off"
                        class="layui-input"
                        v-model="nickname"
                      />
                      <span class="error">{{errors[0]}}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <ValidationProvider :rules="{required: true, min: 6, maxLength: {max: 16}}" name="密码" v-slot="{errors}">
                      <input
                        type="password"
                        id="L_pass"
                        name="pass"
                        autocomplete="off"
                        class="layui-input"
                        v-model="password"
                      />
                      <span class="error">{{errors[0]}}</span>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                </div>
                <div class="layui-form-item">
                  <label for="L_repass" class="layui-form-label"
                    >确认密码</label
                  >
                  <div class="layui-input-inline">
                    <ValidationProvider :rules="{required: true, confirmPassword: true}" name="密码" v-slot="{errors}">
                      <input
                        type="password"
                        id="L_repass"
                        name="repass"
                        autocomplete="off"
                        class="layui-input"
                        v-model="confirmPassword"
                      />
                      <span class="error">{{errors[0]}}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label"
                    >验证码</label
                  >
                  <div class="layui-input-inline">
                    <ValidationProvider name="验证码" rules="required|length:4" v-slot="{errors}">
                      <input
                        type="text"
                        id="L_vercode"
                        name="vercode"
                        placeholder="请回答后面的问题"
                        autocomplete="off"
                        class="layui-input"
                        v-model="code"
                      />
                      <span class="error">{{errors[0]}}</span>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00; position: relative; top: -10px;" v-html="svg" @click="_getCode()"></span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" lay-filter="*" lay-submit>
                    立即注册
                  </button>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者直接使用社交账号快捷注册</span>
                  <a
                    href=""
                    onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-qq"
                    title="QQ登入"
                  ></a>
                  <a
                    href=""
                    onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-weibo"
                    title="微博登入"
                  ></a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate'
import { getCode } from '../api/index'

export default {
  name: 'Reg',
  components: {
    ValidationProvider
  },
  data () {
    return {
      username: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    this._getCode()
    extend('confirmPassword', {
      validate: (value) => {
        return value === this.password
      },
      message: '两次密码输入不一致'
    })
  },
  methods: {
    _getCode () {
      getCode().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>
<style>
  svg {
    width: auto;
    height: 38px;
  }
</style>
