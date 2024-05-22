import { apiInitializer } from "discourse/lib/api";
import I18n from "discourse-i18n";
import TakeABreak from "../components/modal/take-a-break";

export default apiInitializer("1.8.0", (api) => {
  const currentLocale = I18n.currentLocale();
  I18n.translations[currentLocale].js.custom_modal_title =
    settings.message_title;

  function isStaff() {
    const currentUser = api.getCurrentUser();
    return currentUser && (currentUser.moderator || currentUser.admin);
  }

  if (!settings.on_for_non_staff && !isStaff()) {
    return;
  }

  setTimeout(() => {
    api.container.lookup("service:modal").show(TakeABreak);
  }, settings.seconds_until_message * 1000);
});
