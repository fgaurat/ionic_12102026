import { Device } from "@capacitor/device";
import { Dialog } from "@capacitor/dialog";

export function setupDevice(element) {
  element.addEventListener("click", async () => {
    const [info, batteryInfo, languageCode] = await Promise.all([
      Device.getInfo(),
      Device.getBatteryInfo(),
      Device.getLanguageCode(),
    ]);

    console.log(info, batteryInfo, languageCode);

    await Dialog.alert({
      title: "Les infos du téléphones",
      message: `Modèle: ${info.model}, batterie: ${batteryInfo.batteryLevel} `,
    });
  });
}
