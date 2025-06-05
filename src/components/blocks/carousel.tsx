import {
  type ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

type Slide = {
  image: string;
  alt: string;
  title: string;
  caption: string;
};

type Props = {
  slides: Slide[];
  options?: EmblaOptionsType;
};

function Carousel(props: Props) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 3000 }),
  ]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop = autoplay.options.stopOnInteraction === false
      ? autoplay.reset
      : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  );

  return (
    <section>
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div
              className="flex-[0_0_var(--slide-size)] pl-[var(--slide-spacing)]min-w-0"
              key={slide.title}
            >
              <div className="relative h-[var(--slide-height)] select-none">
                <img
                  className="size-full object-fill"
                  src={slide.image}
                  height="300"
                  alt=""
                />
                <div className="absolute inset-0 shadow-[inset_0_0_0_0.2rem_var(--detail-medium-contrast)] flex items-center justify-center z-10">
                  <div className="flex flex-col items-end">
                    <span className="px-4 py-1.5 text-3xl max-w-md font-semibold uppercase bg-brand-600/85 text-white">
                      {slide.title}
                    </span>
                    <span className="px-3 py-1.5 text-2xl italic max-w-md bg-white/70">
                      {slide.caption}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute hidden md:flex bottom-0 py-3 gap-4 w-full justify-center bg-linear-to-t from-black/50 to-black/0">
          <div className="flex gap-2.5 items-center">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"flex items-center justify-center border-3 border-white touch-manipulation no-underline cursor-pointer p-0 m-0 size-6 rounded-full appearance-none data-[selected]:bg-white"}
                data-selected={index === selectedIndex ? "" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

function DotButton(props: ComponentPropsWithRef<"button">) {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
}

export { Carousel };
