import {
  type ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
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

function HeroCarousel(props: Props) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 3000 }),
    Fade(),
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
    <section className="bg-background">
      <div
        className="relative overflow-hidden max-w-[1900px] mx-auto"
        ref={emblaRef}
      >
        <div className="flex">
          {slides.map((slide) => (
            <div
              className="flex-[0_0_var(--slide-size)] pl-[var(--slide-spacing)]min-w-0"
              key={slide.title}
            >
              <div className="relative h-[calc(var(--slide-height)*0.7)] md:h-[var(--slide-height)] max-w-full select-none">
                <img
                  className="size-full object-cover"
                  src={slide.image}
                  height="500"
                  alt={slide.alt}
                />
                <div className="absolute bottom-0 md:inset-0 z-10">
                  <div className="flex h-full md:max-w-screen-md lg:max-w-screen-lg mx-auto items-center justify-end">
                    <div className="relative flex flex-col items-end">
                      <h2 className="px-4 py-1.5 text-4xl leading-8 w-full max-w-md font-bold uppercase bg-background/80 text-white">
                        {slide.title}
                      </h2>
                      <h3 className="relative -right-5 w-[26rem] hidden md:block px-3 py-1 text-2xl italic bg-white/70">
                        {slide.caption}
                      </h3>
                    </div>
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
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"flex items-center justify-center border-2 border-white touch-manipulation no-underline cursor-pointer p-0 m-0 size-4 rounded-full appearance-none data-[selected]:bg-white"}
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

export { HeroCarousel as Carousel };
