# node-shellies-ds9

[![npm-version](https://badgen.net/npm/v/shellies-ds9)](https://www.npmjs.com/package/shellies-ds9)

Handles communication with the next generation of Shelly devices. This Package is only to pimp up the existing package https://badgen.net/npm/v/shellies-ng. Because I'm lost if my Minis don't run in the Homebridge.
If Alex creates a new version of his package that supports the Mini devices, I will delete this package again. thx@sw-koenig...

For the first generation, see [node-shellies](https://github.com/alexryd/node-shellies).

## Supported devices

### Generation 2

- [Shelly Plus 1 + mini](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlus1)
- [Shelly Plus 1 PM + mini](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlus1PM)
- [Shelly Plus 2 PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlus2PM)
- [Shelly Plus I4](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlusI4)
- [Shelly Plus Plug S](https://kb.shelly.cloud/knowledge-base/shelly-plus-plug-s-1)
- [Shelly Plus Plug US](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlugUS)
- [Shelly Plus Plug UK](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlusPlugUK)
- [Shelly Plus Plug IT](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlusPlugIT)
- [Shelly Plus H&T](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlusHT)
- [Shelly Plus Smoke](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlusSmoke)
- [Shelly Plus Wall Dimmer](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlusWallDimmer)
- [Shelly Plus RGBW PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlusRGBWPM)
- [Shelly Plus 0-10V Dimmer](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlus10V)
- [Shelly Plus PM Mini](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlusPMMini)
- [Shelly Plus Uni](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlusUni)
- [Shelly Pro 1](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPro1)
- [Shelly Pro 1 PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPro1PM)
- [Shelly Pro 2](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPro2)
- [Shelly Pro 2 PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPro2PM)
- [Shelly Pro 3](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPro3)
- [Shelly Pro 4 PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPro4PM)
- [Shelly Pro Dual Cover PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyProDualCoverPM)
- [Shelly Pro EM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyProEM)
- [Shelly Pro 3 EM (400)](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPro3EM)
- [Shelly Pro Dimmer 1 PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyProDimmer1PM)
- [Shelly Pro Dimmer 2 PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyProDimmer2PM)
- [Shelly Pro Dimmer 0/1-10V PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyProDimmer0110VPM)
- [Shelly Pro RGBWW PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyProRGBWWPM)

### Generation 3

- [Shelly 1](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/Shelly1G3)
- [Shelly 1 PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/Shelly1PMG3)
- [Shelly 2 PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/Shelly2PMG3)
- [Shelly I4](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyI4G3)
- [Shelly 1L](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/Shelly1LG3)
- [Shelly 2L](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/Shelly2LG3)
- [Shelly 1 Mini](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyMini1G3)
- [Shelly 1 PM Mini](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyMini1PMG3)
- [Shelly PM Mini](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyMiniPMG3)
- [Shelly AZ Plug](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyAZPlug)
- [Shelly Plug S](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyPlugSG3)
- [Shelly Outdoor Plug S](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyOutdoorPlugSG3)
- [Shelly Dimmer 0/1-10V PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyDimmer0110VPMG3)
- [Shelly Dimmer](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyDimmerG3)
- [Shelly D Dimmer](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyDDimmerG3)
- [Shelly H&T](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyHTG3)
- [Shelly 3EM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/Shelly3EMG3)
- [Shelly EM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyEMG3)

### Generation 4

- [Shelly 1](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen4/Shelly1G4)
- [Shelly 1 PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen4/Shelly1PMG4)
- [Shelly 1 Mini](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen4/ShellyMini1G4)
- [Shelly 1 PM Mini](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen4/ShellyMini1PMG4)
- [Shelly Flood](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen4/ShellyFlood)
- [Shelly 2 PM](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen4/Shelly2PMG4)
- [Shelly PowerStrip](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen4/ShellyPowerStripG4)

<sup>1</sup> Support for outbound websockets is a work in progress.

## Basic usage example

```typescript
import {
  Device,
  DeviceId,
  MdnsDeviceDiscoverer,
  Shellies,
  ShellyPlus1,
} from "shellies-ds9";

const shellies = new Shellies();

// handle discovered devices
shellies.on("add", async (device: Device) => {
  console.log(`${device.modelName} discovered`);
  console.log(`ID: ${device.id}`);

  // use instanceof to determine the device model
  if (device instanceof ShellyPlus1) {
    const plus1 = device as ShellyPlus1;

    // toggle the switch
    await plus1.switch0.toggle();
  }
});

// handle asynchronous errors
shellies.on("error", (deviceId: DeviceId, error: Error) => {
  console.error("An error occured:", error.message);
});

// create an mDNS device discoverer
const discoverer = new MdnsDeviceDiscoverer();
// register it
shellies.registerDiscoverer(discoverer);
// start discovering devices
discoverer.start();
```

See [homebridge-shelly-ng]() for a real-world example.
