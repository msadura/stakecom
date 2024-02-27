import Image from "next/image";

import communeLogo from "~/components/assets/commune.svg";

export function ComLogo({ size = 50 }: { size: number }) {
  return (
    <Image src={communeLogo as string} alt="wCom" width={size} height={size} />
  );
}
