import { useCurrentFrame, interpolate } from "remotion";
import { Gif } from "@remotion/gif";
import explosionSource from "../assets/explosion.gif";

export const Text = ({ children, className = "", nbFrameByChar = 2 }) => {
  const frame = useCurrentFrame();
  // Nombre total de caractères à afficher à chaque moment
  const charactersToShow = Math.floor(frame / nbFrameByChar);

  // Le texte affiché en fonction du nombre de caractères à afficher
  const displayedText = children.slice(0, charactersToShow);
  const displayImg = displayedText.length < children.length;

  const styleContainer = {
    position: "relative",
    fontSize: "20px",
    color: "red",
    fontWeight: 700,
    textShadow:
      "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
  };
  const styleGif = {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    aspectRatio: "1/1",
  };
  return (
    <span style={styleContainer}>
      {displayedText}
      {displayImg ? <Gif src={explosionSource} style={styleGif} /> : <></>}
    </span>
  );
};
