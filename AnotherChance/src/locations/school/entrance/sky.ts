import { getEngine } from "../../../Engine/engine";
import Sky from "../../../../public/assets/images/locations/school/entrance/sky.webp";

const SchoolSky = await getEngine().createSimpleSprite({ source: Sky });
// SchoolSky!.setTransform(180, 200);

export default SchoolSky!;
