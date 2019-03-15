<script>
export default {
  name: "Title",
  computed: {
    unreadMessages() {
      return this.$store.state.unreadMessages;
    },
    data() {
      return {
        intervalHandler: {}
      };
    }
  },
  methods: {
    startNotificationAnimation() {
      if (this.intervalHandler) return;

      let notificationToggle = true;
      this.intervalHandler = window.setInterval(() => {
        document.title = `${
          notificationToggle
            ? `Unread Messages:${this.unreadMessages}`
            : "Hikouki"
        }`;

        let icon = document.querySelector("link[rel*='icon']");
        icon.href = notificationToggle ? "./alert.ico" : "favicon.ico";
        notificationToggle = !notificationToggle;
      }, 1000);
    },
    stopNotificationAnimation() {
      window.clearInterval(this.intervalHandler);
      document.title = "Hikouki";
      icon.href = "./alert.ico";
      this.intervalHandler = null;
    }
  },
  watch: {
    unreadMessages() {
      if (this.$store.state.unreadMessages > 0)
        this.startNotificationAnimation();
      else this.stopNotificationAnimation();
    }
  },
  mounted() {
    window.addEventListener("focus", () =>
      this.$store.commit("markMessagesAsRead")
    );
  },
  render() {}
};
</script>