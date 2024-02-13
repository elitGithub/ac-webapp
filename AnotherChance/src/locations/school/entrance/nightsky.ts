import SceneTransitionFlags from "../../../../../src/engine/scene/models/scenetransitions";
import { getEngine } from "../../../../../src/engine";
import Sky from "../../../../assets/locations/school/entrance/sky_night.webp";

const SkyNight = await getEngine().createSimpleSprite({ source: Sky });
// SchoolSky!.setTransform(180, 200);

export default SkyNight!;
