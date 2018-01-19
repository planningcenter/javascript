(function() {
  (this.Helpdesk = this.Helpdesk || {}),
    (Helpdesk.init = function() {
      return (
        null == this.zendeskDetails && (this.zendeskDetails = {}),
        "function" == typeof this.afterInit ? this.afterInit() : void 0
      );
    }),
    (Helpdesk.root = function() {
      return Helpdesk.appURLForEnv(railsEnv)("helpdesk") + "/" + railsAppName;
    }),
    (Helpdesk.load = function() {
      return (
        "function" == typeof this.beforeLoad && this.beforeLoad(),
        void (null != this.zendeskDetailsUrl
          ? $.get(
              this.zendeskDetailsUrl,
              (function(e) {
                return function(t) {
                  return (e.zendeskDetails = t), e.loadDialog();
                };
              })(this)
            )
          : this.loadDialog())
      );
    }),
    (Helpdesk.loadDialog = function() {
      var e, t, n, i, s, o, a, r;
      return (
        (t = this.addIframe()),
        (e = window.addEventListener ? "addEventListener" : "attachEvent"),
        (i = "attachEvent" === e ? "onmessage" : "message"),
        (n = "attachEvent" === e ? "onkeyup" : "keyup"),
        (r = window.removeEventListener
          ? "removeEventListener"
          : "detachEvent"),
        (s = function() {
          return (
            t.parentElement.removeChild(t),
            "function" == typeof Helpdesk.afterClose && Helpdesk.afterClose(),
            window[r](i, a, !1),
            document[r](n, o, !1)
          );
        }),
        (o = function(e) {
          return 27 === e.keyCode ? s() : void 0;
        }),
        (a = function(e) {
          var t;
          return (
            (t = new RegExp(Helpdesk.appURLForEnv(railsEnv)("helpdesk"))),
            t.test(e.origin)
              ? s()
              : void console.warn("Message from " + e.origin + " was blocked!")
          );
        }),
        (Helpdesk.close = s),
        window[e](i, a, !1),
        document[e](n, o, !1),
        t
      );
    }),
    (Helpdesk.escape = encodeURIComponent),
    (Helpdesk.addIframe = function() {
      var e;
      return (
        (e = document.createElement("iframe")),
        (e.height = "100%"),
        (e.width = "100%"),
        (e.frameborder = 0),
        (e.seamless = "seamless"),
        (e.id = "helpdesk_overlay"),
        (e.style.position = "fixed"),
        (e.style.zIndex = 99999),
        (e.style.top = 0),
        (e.style.left = 0),
        (e.style.opacity = 0),
        (e.style.border = "0px solid black"),
        (e.style.overflow = "hidden"),
        (e.style.transition = "opacity .2s"),
        (e.onload = function() {
          return (
            (e.style.opacity = 1),
            setTimeout(function() {
              return "function" == typeof Helpdesk.afterLoad
                ? Helpdesk.afterLoad()
                : void 0;
            }, 200)
          );
        }),
        (e.src = this.iframeSrc()),
        document.getElementsByTagName("body")[0].appendChild(e),
        e
      );
    }),
    (Helpdesk.iframeSrc = function() {
      var e, t, n, i, s;
      if (
        ((t = "" + this.root() + "?"),
        (t += "&organization_id=" + this.accountCenterOrganizationId),
        (t += "&user_id=" + this.accountCenterUserId),
        (t += "&app_name=" + railsAppName),
        (t += "&current_page=" + this.escape(window.location.href)),
        null != this.backgroundColor &&
          (t += "&background=" + this.escape(this.backgroundColor)),
        null != this.zendeskDetails)
      )
        if (
          ((i = Object.prototype.toString.call(this.zendeskDetails)),
          "[object Object]" === i)
        ) {
          s = this.zendeskDetails;
          for (e in s)
            (n = s[e]), (t += "&zendesk_details[" + e + "]=" + this.escape(n));
        } else
          "[object String]" === i &&
            (t +=
              "&zendesk_details[unexpected]=" +
              this.escape(this.zendeskDetails.substr(0, 50)));
      return t;
    }),
    (Helpdesk.appURLForEnv = function(env) {
      return function(appName) {
        if (!(env && appName)) return;

        switch (env) {
          case "production":
            return "https://" + appName + ".planningcenteronline.com";
          case "staging":
            return "https://" + appName + "-staging.planningcenteronline.com";
          case "development":
            return "http://" + appName + ".pco.test";
          case "test":
            return "http://" + appName + ".pco.test";
          default:
            return "http://" + appName + ".planningcenteronline.com";
        }
      };
    });
  Helpdesk.init();
}.call(this));
