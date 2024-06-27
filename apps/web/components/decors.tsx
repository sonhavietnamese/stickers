import Image from "next/image"

export default function Decors() {
  return (
    <>
      <figure className="absolute z-30 left-1/2 -translate-x-1/2">
        <Image
          src={"/assets/logo.png"}
          className="w-[150px]"
          width={150}
          height={200}
          alt=""
        />
      </figure>

      <div className="absolute z-20 left-0 top-0 w-[200px] h-[100px]">
        <figure className="absolute -left-12 -top-[40px]">
          <Image
            src={"/assets/tl-01.png"}
            className="w-[150px]"
            width={150}
            height={200}
            alt=""
          />
        </figure>

        <figure className="absolute left-2 top-[10px]">
          <Image
            src={"/assets/tl-02.png"}
            className="w-[150px]"
            width={150}
            height={200}
            alt=""
          />
        </figure>
      </div>

      <div className="absolute z-20 right-0 top-0 w-[200px] h-[100px]">
        <figure className="absolute z-20 -right-4 -top-[60px]">
          <Image
            src={"/assets/tr-01.png"}
            className="w-[150px]"
            width={150}
            height={200}
            alt=""
          />
        </figure>

        <figure className="absolute -right-[40px] -top-[10px]">
          <Image
            src={"/assets/tr-02.png"}
            className="w-[150px]"
            width={150}
            height={200}
            alt=""
          />
        </figure>
      </div>
    </>
  )
}
