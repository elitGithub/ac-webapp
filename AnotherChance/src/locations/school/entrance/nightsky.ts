import { getEngine } from "../../../Engine/engine";
import Sky from "../../../../public/assets/images/locations/school/entrance/sky_night.webp";

const SkyNight = await getEngine().createSimpleSprite({ source: Sky });
// SchoolSky!.setTransform(180, 200);

export default SkyNight!;
