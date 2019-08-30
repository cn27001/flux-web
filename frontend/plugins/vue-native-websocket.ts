import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import config from '../config';

export default ({ store }: { store: any }) => {
  Vue.use(VueNativeSock, 'ws://' + config.wsUrl, {
    store,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
    format: 'json',
    passToStoreHandler: function (eventName: any, event: any) {
      if (!eventName.startsWith('SOCKET_')) { return }
      let method = 'commit'
      let target = eventName.toUpperCase()
      let msg = event
      if (this.format === 'json' && event.data) {
        msg = JSON.parse(event.data)
        if (msg.mutation) {
          target = [msg.namespace || '', msg.mutation].filter((e) => !!e).join('/')
        } else if (msg.Action) {
          method = 'dispatch'
          target = [msg.namespace || '', msg.Action].filter((e) => !!e).join('/')
        }
      }
      this.store[method](target, msg)
    }
  });
}
