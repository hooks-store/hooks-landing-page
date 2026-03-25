import { LinkmeIcon } from './LinkmeIcon';

export default function UrlInputBar() {
  return (
    <div className="flex items-center bg-white rounded-full h-14 max-w-[480px] w-full pl-4 pr-1.5 gap-3 shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] transition-shadow duration-500">
      <LinkmeIcon size={24} />
      <span className="text-gray-400 text-base flex-1 select-none">link.me/yourname</span>
      <button className="bg-black text-white text-base font-semibold px-5 py-2.5 rounded-full hover:bg-gray-900 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 whitespace-nowrap">
        Start for free
      </button>
    </div>
  );
}
