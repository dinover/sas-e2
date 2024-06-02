<template>
  <div class="item">
    <AddProductsRedirectionButton class="animated-button"/>
    <GetData class="animated-button"/>
  </div>
</template>

<script>
import GetData from '../components/GetData.vue';
import AddProductsRedirectionButton from '../components/AddProductsRedirectionButton.vue';

export default {
  components: {
    GetData,
    AddProductsRedirectionButton
  },
};
</script>

<style>
/* Resetear estilos */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Estilos para los elementos agregados */
.item {
  padding-left: 10%;
  position: relative;
  width: 80%;
  margin-top: 20%;
}

.item:before {
  background: #ef5036;
  border-radius: 10px;
  bottom: 50%;
  content: "";
  display: block;
  left: 0;
  position: absolute;
  height: 0;
  width: 5px;
  transform: translateY(50%);
  animation: expandFromCenter 1.5s forwards;
}

@keyframes expandFromCenter {
  0% {
    height: 0;
  }

  100% {
    height: 100%;
  }
}

/* Nueva animación para revertir la altura */
@keyframes collapseToCenter {
  0% {
    height: 100%;
  }

  100% {
    height: 0;
  }
}

.reverse-animation:before {
  animation: collapseToCenter 1.5s forwards;
}

.animated-button {
  opacity: 0;
  transform: translateX(-100%);
  animation: appearFromLeft 0.5s forwards;
  animation-delay: 1.5s;
}

@keyframes appearFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-18%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animated-button:nth-child(2) {
  animation-delay: 1.8s;
}

.animated-button:nth-child(3) {
  animation-delay: 2s;
}

/* Animaciones de salida */
@keyframes slideOutRight {
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}

.animate-out {
  animation: slideOutRight 0.5s forwards;
}
</style>