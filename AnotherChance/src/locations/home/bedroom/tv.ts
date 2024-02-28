import { getEngine } from "../../../Engine/engine";
import BedroomTV from "../../../../public/assets/images/locations/home/bedroom/tv.webp";

const BedroomTVInt = await getEngine().createSimpleInteractable(
    "bedroom_tv",
    {
        action: "interact",
        handler: () => {},
    },
    { source: BedroomTV }
);
BedroomTVInt.setTransform(148, 630);

export default BedroomTVInt;
