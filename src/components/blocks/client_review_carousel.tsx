import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  type ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

function usePrevNextButtons(
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
}

type ButtonProps = ComponentPropsWithRef<"button">;

function PrevButton(props: ButtonProps) {
  const { children, ...restProps } = props;

  return (
    <button
      className="tap-highlight-transparent appearance-none bg-transparent touch-manipulation
      inline-flex no-underline cursor-pointer size-8 p-2 border border-gray-300 hover:bg-gray-200
      rounded-full text-gray-600 items-center justify-center disabled:opacity-50"
      type="button"
      {...restProps}
    >
      <svg className="" viewBox="0 0 532 532">
        <title>Previous</title>
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        />
      </svg>
      {children}
    </button>
  );
}

function NextButton(props: ButtonProps) {
  const { children, ...restProps } = props;

  return (
    <button
      className="tap-highlight-transparent appearance-none bg-transparent touch-manipulation
      inline-flex no-underline cursor-pointer size-8 p-2 border border-gray-300 hover:bg-gray-200
      rounded-full text-gray-600 items-center justify-center disabled:opacity-50"
      type="button"
      {...restProps}
    >
      <svg className="size-4" viewBox="0 0 532 532">
        <title>Next</title>
        <path
          fill="currentColor"
          d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
        />
      </svg>
      {children}
    </button>
  );
}

type CarouselProps = {
  slides: number[];
  options?: EmblaOptionsType;
};

function ClientReviewCarousel(props: CarouselProps) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div
      style={{
        "--slide-height": "16rem",
        "--slide-spacing": "1rem",
        "--slide-size": "100%",
      } as React.CSSProperties}
    >
      <div className="overflow-clip w-full" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom -ml-[var(--slide-spacing)]">
          {slides.map((index) => (
            <div
              className="transform-gpu flex-[0_0_var(--slide-size)] min-w-0 pl-[var(--slide-spacing)]"
              key={index}
            >
              <div className="border border-gray-300 rounded-lg text-4xl font-semibold flex items-center justify-center h-[var(--slide-height)] select-none">
                Review from: {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-12 py-4">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
}

export { ClientReviewCarousel };
