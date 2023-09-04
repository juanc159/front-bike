<template>
  <div>
    <div id="whatsapp-chat" class="hide" :class="{ 'show': isChatVisible }">
      <div class="header-chat">
        <div style="cursor: pointer; color: white;" class="head-home" @click="showList()">
          <h6 style="cursor: pointer; color: white; font-size: 16px;">Contacta a tu experto</h6>
        </div>
        <div class="get-new hide">
          <div id="get-label"></div>
          <div id="get-nama"></div>
        </div>
      </div>
      <div class="home-chat" v-if="!isTextVisible">
        <a v-for="(item, index) in arrayWs" :key="index" class="informasi" href="javascript:void" title="Chat Whatsapp"
          @click="openChat(item)">
          <div class="info-avatar">
            <!-- @if ($showRo->user->url_vcard == '') -->
            <img :src="whatsapp" />
            <!-- @else
            <img src='https://tracecr.housebl.com:7443/images/Profile/{{$showRo->user->url_vcard}}' />
            @endif -->
          </div>
          <div class="info-chat">
            <span class="chat-label">{{ item.fullName }}</span>
            <span class="chat-nama">{{ item.company }}</span>
          </div>
          <span class="my-number">{{ item.phoneNumber }}</span>
        </a>
      </div>
      <div class="start-chat" v-if="isTextVisible">
        <div class="first-msg"><span>¡Hola! ¿Qué puedo hacer por ti? Deja tu mensaje. En breve me conectaré
            contigo.</span></div>
        <div class="sundaku-msg">
          <textarea id="chat-input" placeholder="Escríbenos" rows="3" v-model="message"></textarea>
          <a href="javascript:void" class="send-it" @click="sendMessage">
            <VIcon icon="mdi-send" /> <!-- Asumiendo que estás usando Vuetify para los íconos -->
            <i class="fa fa-send"></i>
          </a>
        </div>
      </div>
      <div id="get-number"></div>
      <a class="close-chat" href="javascript:void" @click="closeChat">×</a>
    </div>
    <a class="sundakushow-chat" href="javascript:void" title="Show Chat" @click="showChat">
      <VIcon icon=" mdi-whatsapp"></VIcon>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrayWs: [
        {
          fullName: "Fredyen Mendivelso",
          phoneNumber: "+57 302 3178887",
          avatar: "http://127.0.0.1:8000/storage/users/user_1/company/company_2/logo//LAXVsnMbU53vTHTKCFvBB7zT6pE5sbgSYw7aSGb3.png",
          company: "",
        },
        {
          fullName: "Esneyder Mendivelso",
          phoneNumber: "+57 305 7530224",
          avatar: "http://127.0.0.1:8000/storage/users/user_1/company/company_2/logo//LAXVsnMbU53vTHTKCFvBB7zT6pE5sbgSYw7aSGb3.png",
          company: "",
        },
      ],
      isChatVisible: false,
      isTextVisible: false,
      message: "",
      whatsapp: "http://127.0.0.1:8000/storage/users/user_1/company/company_2/logo//LAXVsnMbU53vTHTKCFvBB7zT6pE5sbgSYw7aSGb3.png", // Cambia la URL de la imagen de WhatsApp según tus necesidades
    };
  },
  methods: {
    sendMessage() {
      if (this.message !== "") {
        const getNumber = this.contactNumber;
        const url = "https://web.whatsapp.com/send";
        const phone = getNumber;
        const text = "&text=" + this.message;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          window.location.href = "whatsapp://send?phone=" + phone + text;
        } else {
          window.open(url + "?phone=" + phone + text, "_blank");
        }
      }
    },
    showList() {
      this.isChatVisible = true;
      this.isTextVisible = false;
    },
    showChat() {
      this.isChatVisible = true;
    },
    closeChat() {
      this.showList()
      this.isChatVisible = false;
      this.message = ""; // Limpiar el mensaje al cerrar el chat
    },
    openChat() {
      console.log("aaa");
      this.isTextVisible = true;
      this.contactName = item.fullName;  // Actualizar la información del contacto al abrir el chat
      this.contactLabel = item.company;
      this.contactNumber = item.phoneNumber;
      this.contactAvatar = item.avatar;
    },
  },
};
</script>


<style lang="scss">
#whatsapp-chat {
  position: fixed;
  background: #fff;
  width: 350px !important;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgb(32 33 36 / 28%);
  bottom: 177px;
  right: 90px;
  overflow: hidden;
  z-index: 99;
  animation-name: showchat;
  animation-duration: 0.3s;
  transform: scale(1);
}

a.sundakushow-chat {
  background: linear-gradient(to right);
  color: #fff;
  position: fixed;
  z-index: 98;
  bottom: 92px;
  right: 28px;
  font-size: 25px;
  padding: 23px 20px;
  border-radius: 60%;
  box-shadow: 0 1px 15px rgb(32 33 36 / 28%);
  width: 80px !important;
  height: auto;
}

a.sundakushow-chat {
  background:

    linear-gradient(-50deg, #ffcc33, #ff6600, #ff0066, #9900ff);
  background-size: 320% 200%;
  -webkit-animation:

    Gradient 3s ease infinite;
  -moz-animation: Gradient 3s ease infinite;
  animation:

    Gradient 3s ease infinite;
}

@-webkit-keyframes Gradient {
  0% {
    background-position: 0 50%
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0 50%
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0 50%
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0 50%
  }
}

@keyframes Gradient {
  0% {
    background-position: 0 50%
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0 50%
  }
}

a.sundakushow-chat i {
  transform: scale(1.2);
  margin: 0px 0px 0px 3px;
}

.header-chat {
  background: linear-gradient(to right top, #ff6600, #ff6600);
  color: #fff;
  padding: 15px
}

.header-chat h3 {
  margin: 0 0 10px
}

.header-chat p {
  font-size: 14px;
  line-height: 1.7;
  margin: 0
}

.info-avatar {
  position: relative
}

.info-avatar img {
  border-radius: 100%;
  width: 50px;
  height: 50px;
  float: left;
  margin: 0 10px 0 0
}

.info-avatar:before {
  content: '\f232';
  z-index: 1;
  font-family: "Font Awesome 5 Brands";
  background: #23ab23;
  color: #fff;
  padding: 0px 5px;
  border-radius: 100%;
  position: absolute;
  top: 30px;
  left: 30px
}

a.informasi {
  padding: 20px;
  display: block;
  overflow: hidden;
  animation-name: showhide;
  animation-duration: 1s
}

a.informasi:hover {
  background: #f1f1f1
}

.info-chat span {
  display: block
}

#get-label,
span.chat-label {
  font-size: 12px;
  color: #888
}

#get-nama,
span.chat-nama {
  margin: 5px 0 0;
  font-size: 15px;
  font-weight: 700;
  color: #222
}

#get-label,
#get-nama {
  color: #fff
}

span.my-number {
  display: none
}

.sundaku-msg {
  color: #444;
  padding: 20px;
  font-size: 12.5px;
  text-align: center;
  border-top: 1px solid #ddd
}

textarea#chat-input {
  border: none;
  font-family: sans-serif;
  width: 100%;
  height: auto;
  outline: none;
  resize: auto;
}

a#send-it {
  color: white;
  width: 40px;
  margin: 3px 0px 3px 8px;
  font-weight: 700;
  padding: 14px;
  background: #ff6600;
  border-radius: 30px;
}

.first-msg {
  background: #f5f5f5;
  padding: 30px;
  text-align: center
}

.first-msg span {
  background: #e2e2e2;
  color: #333;
  font-size: 14.2px;
  line-height: 1.7;
  border-radius: 10px;
  padding: 15px 20px;
  display: inline-block
}

.start-chat .sundaku-msg {
  display: flex
}

#get-number {
  display: none
}

a.close-chat {
  position: absolute;
  top: 0px;
  right: 15px;
  color: #fff;
  font-size: 30px
}

@keyframes showhide {
  from {
    transform: scale(.5);
    opacity: 0
  }
}

@keyframes showchat {
  from {
    transform: scale(0);
    opacity: 0
  }
}

@media screen and (max-width:480px) {
  #whatsapp-chat {
    width: auto;
    left: 5%;
    right: 5%;
    font-size: 80%
  }
}

.hide {
  display: none;
  animation-name: showhide;
  animation-duration: 1.5s;
  transform: scale(1);
  opacity: 1
}

.show {
  display: block;
  animation-name: showhide;
  animation-duration: 0.5s;
  transform: scale(1);
  opacity: 1
}
</style>
