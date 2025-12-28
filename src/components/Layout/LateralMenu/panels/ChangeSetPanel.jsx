import images from "../../../../assets/images/images";

const CHANGE_SET_ITEMS = [
  { id: "bookcafe", image: "./assets/img/changeset/bookcafe.png", premium: false },
  { id: "dreamin", image: "./assets/img/changeset/dreamin.png", premium: true },
  { id: "chill", image: "./assets/img/changeset/chill.png", premium: true },
  { id: "cottage", image: "./assets/img/changeset/cottage.png", premium: true },
  { id: "kyoto", image: "./assets/img/changeset/kyoto.png", premium: true },
  { id: "lofidesk", image: "./assets/img/changeset/lofidesk.png", premium: true },
];

/**
 * ChangeSetPanel - Scene/set selection panel
 */
const ChangeSetPanel = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[7%] right-[90px] w-[350px] max-h-[632px] rounded-[24px] z-[-1] bg-[#070707]">
      <div className="change-set m-[16px] max-h-[600px] rounded-[16px] overflow-y-auto">
        <div className="h-[42px] flex items-center justify-between">
          <h4 className="font-[700] text-[20px] text-white leading-[24px]">
            Change Set
          </h4>
        </div>

        {CHANGE_SET_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className={`${index === 0 ? "mb-[16px]" : index === CHANGE_SET_ITEMS.length - 1 ? "" : "my-[16px]"} cursor-pointer bg-[#0005] relative`}
          >
            {item.premium && (
              <div className="flex flex-col h-[60px] justify-center absolute right-[-3%] top-[4px] w-[60px] z-40">
                <img src={images.premium} alt="premium" />
              </div>
            )}
            <img
              className={`h-[190px] object-cover w-[100%] rounded-[16px] aspect-video ${item.premium ? "opacity-50" : ""}`}
              src={item.image}
              alt={item.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeSetPanel;
