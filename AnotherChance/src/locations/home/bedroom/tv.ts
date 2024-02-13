import { getEngine } from "../../../../../src/engine";
import BedroomTV from "../../../../assets/locations/home/bedroom/tv.webp";

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
