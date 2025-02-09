import { convertTestName } from "@/components/storeCardComponent/utils/convert-test-name";

export default function HandleTooltipComponent({
  isInput,
  tooltipTitle,
  colors,
  isConnecting,
  isCompatible,
  isSameNode,
}: {
  isInput: boolean;
  colors: string[];
  tooltipTitle: string;
  isConnecting: boolean;
  isCompatible: boolean;
  isSameNode: boolean;
}) {
  const tooltips = tooltipTitle.split("\n");
  const plural = tooltips.length > 1 ? "s" : "";
  return (
    <div className="font-medium">
      {isSameNode ? (
        "Can't connect to the same node"
      ) : (
        <div className="flex items-start gap-1.5">
          {isConnecting ? (
            isCompatible ? (
              <span>
                <span className="font-semibold">Connect</span> to
              </span>
            ) : (
              <span>Incompatible with</span>
            )
          ) : (
            <span className="text-xs">
              {isInput
                ? `Input${plural} type${plural}`
                : `Output${plural} type${plural}`}
              :{" "}
            </span>
          )}
          {tooltips.map((word, index) => (
            <div
              className="rounded-sm px-1.5 text-xs font-medium"
              style={{
                backgroundColor: `${colors[index]}40`, // Add 40 (25%) opacity to background
                color: colors[index], // Keep text the same color but solid
              }}
              data-testid={`${isInput ? "input" : "output"}-tooltip-${convertTestName(word)}`}
            >
              {word}
            </div>
          ))}
          {isConnecting && <span>{isInput ? `input` : `output`}</span>}
        </div>
      )}
      {!isConnecting && (
        <div className="mt-2 flex flex-col gap-0.5 text-xs">
          <div>
            <b>Drag</b> to connect compatible {!isInput ? "inputs" : "outputs"}
          </div>
          <div>
            <b>Select</b> to filter compatible {!isInput ? "inputs" : "outputs"}{" "}
            and components
          </div>
        </div>
      )}
    </div>
  );
}
