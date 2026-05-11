import { useState, useMemo } from 'react';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

const products = ['T-shirt', 'Hoodie', 'Sweatshirt', 'Bathing Suit', 'Bikini', 'Backpack', 'Leggings', 'Travel Mug'];

const fulfillmentCosts: Record<string, number> = {
  'T-shirt': 9.99,
  'Hoodie': 14.99,
  'Sweatshirt': 12.99,
  'Bathing Suit': 11.99,
  'Bikini': 8.99,
  'Backpack': 15.99,
  'Leggings': 10.99,
  'Travel Mug': 7.99,
};

const HOODIE_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/114840784/P2WDXiBGiZM6dWndJHD2aB/hoodie-product-GRZbibXBHC57GZStZ4Zchj.webp';

export default function EarningsCalculator() {
  const [selectedProduct, setSelectedProduct] = useState('T-shirt');
  const [price, setPrice] = useState(25);
  const [dailySales, setDailySales] = useState(82);
  const { ref, isVisible } = useScrollAnimation(0.2);

  const fulfillmentCost = fulfillmentCosts[selectedProduct] || 9.99;
  const monthlyRevenue = useMemo(() => {
    return (price - fulfillmentCost) * dailySales * 30;
  }, [price, dailySales, fulfillmentCost]);

  const animatedRevenue = useCountUp(Math.max(0, Math.round(monthlyRevenue * 100)), 1500, isVisible);
  const displayRevenue = (animatedRevenue / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const pricePercent = ((price - 10) / 90) * 100;
  const salesPercent = ((dailySales - 1) / 199) * 100;

  return (
    <div ref={ref} className="card-navy-teal overflow-hidden transition-colors duration-300">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Product image */}
        <div className="lg:w-[40%] h-64 lg:h-auto relative overflow-hidden">
          <img
            src={HOODIE_IMG}
            alt="Product"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0B1926]/30 hidden lg:block" />
        </div>

        {/* Right: Calculator */}
        <div className="lg:w-[60%] p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Choose a product</h3>
              <div className="flex flex-wrap gap-2">
                {products.map((product) => (
                  <button
                    key={product}
                    onClick={() => setSelectedProduct(product)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ${
                      selectedProduct === product
                        ? 'bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.1)] scale-105'
                        : 'border border-white/20 text-white/80 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {product}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-[#8A8F98] text-sm whitespace-nowrap">
              Fulfillment cost*: ${fulfillmentCost.toFixed(2)}
            </span>
          </div>

          <div className="mt-8">
            <h3 className="text-white font-semibold text-lg mb-6">Quantity and price</h3>

            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <label htmlFor="sell-price-range" className="text-[#8A8F98] text-sm">Sell it for:</label>
                <span className="bg-white/10 text-white text-sm px-3 py-1 rounded-full font-medium">${price}</span>
              </div>
              <div className="relative">
                <input
                  id="sell-price-range"
                  name="sell-price"
                  type="range"
                  min="10"
                  max="100"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #E8930C 0%, #E8930C ${pricePercent}%, #333 ${pricePercent}%, #333 100%)`,
                  }}
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <label htmlFor="daily-sales-range" className="text-[#8A8F98] text-sm">Daily sales:</label>
                <span className="bg-white/10 text-white text-sm px-3 py-1 rounded-full font-medium">{dailySales}</span>
              </div>
              <div className="relative">
                <input
                  id="daily-sales-range"
                  name="daily-sales"
                  type="range"
                  min="1"
                  max="200"
                  value={dailySales}
                  onChange={(e) => setDailySales(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #E8930C 0%, #E8930C ${salesPercent}%, #333 ${salesPercent}%, #333 100%)`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-[#8A8F98] text-sm mb-2">Your monthly sales*:</p>
            <p className="text-white text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-bold tracking-tight leading-none break-all sm:break-normal">
              ${displayRevenue}
            </p>
            <button className="mt-6 bg-white/5 border border-white/20 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-[background-color,border-color,transform] duration-200">
              Make Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
