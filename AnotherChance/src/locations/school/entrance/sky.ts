import SceneTransitionFlags from "../../../../../src/engine/scene/models/scenetransitions";
import { getEngine } from "../../../../../src/engine";
import Sky from "../../../../assets/locations/school/entrance/sky.webp";

const SchoolSky = await getEngine().createSimpleSprite({ source: Sky });
// SchoolSky!.setTransform(180, 200);

export default SchoolSky!;
