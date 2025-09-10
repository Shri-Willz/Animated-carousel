import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import img1 from "@/assets/earaid1.png";
import img2 from "@/assets/earaid2.png";
import img3 from "@/assets/earaid3.png";


interface ImageData {
  id: string;
  src: string;
}

const App: React.FC = () => {
  const [imageOrder, setImageOrder] = useState<ImageData[]>([
    { id: 'image1', src: img1},
    { id: 'image2', src: img2},
    { id: 'image3', src: img3}
  ]);
  
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [isPoping, setIsPoping] = useState<boolean>(false);

  const shuffleImages = (): void => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsShuffling(true);
    setIsPoping(true);
    
    setTimeout(() => {
      setImageOrder(prevOrder => [
        prevOrder[2],
        prevOrder[0],
        prevOrder[1]
      ]);
      
      setIsShuffling(false);
      
      setTimeout(() => {
        setIsAnimating(false);
      });
      
    },1000);
    
  };


  const getSlotTransform = (index: number): string => {
    if (!isShuffling) return '';
    switch(index) {
      case 0: return 'translate-x-80';
      case 1: return 'translate-x-60';
      case 2: return '-translate-x-180';
      default: return '';
    }
  };

   const getPop = (index :number) : string => {
    if(!isPoping) return '';

    switch(index){
      case 1: return 'scale-150';
      default: return '';
    }
  }
  
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8 bg-gradient-to-br from-slate-900 via-black-900 to-slate-900 p-6">
      <Card className="relative w-full max-w-5xl shadow-2xl">
        <CardContent className="p-8">
          <div className="flex justify-between items-center gap-6">
            {imageOrder.map((image, index) => (
              <Card 
                key={`slot-${index}`} 
                className={`w-64 h-48 overflow-hidden border-0 shadow-xl transition-all duration-700 ease-out ${getSlotTransform(index)} ${getPop(index)}`}
              >
                <CardContent className={`p-0 h-full `}>
                  <div className={`w-full h-full flex items-center justify-center text-2xl font-bold text-white`}>
                    <img src={image.src} alt={image.id} className={`p-2 `} />
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button 
              variant="secondary"
              size="icon"
              className={`absolute -right-6 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/90 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed z-10`}
              onClick={shuffleImages}
              disabled={isAnimating}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App
