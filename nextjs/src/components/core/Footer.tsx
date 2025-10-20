"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type FooterData = {
  company: {
    name: string;
    cs: string;
    email: string;
    cooperation: string;
  };
  consumerProtection: {
    name: string;
    ministry: string;
    whatsapp: string;
  };
  informationLinks: { title: string; href: string }[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  copyright: string;
};

export default function Footer() {
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    // ✅ Data dummy langsung di sini
    const dummyData: FooterData = {
      company: {
        name: "ZARIFA COLLECTION",
        cs: "+62 812 2870 2898",
        email: "info@zarifacollection.com",
        cooperation: "team@zarifacollection.com",
      },
      consumerProtection: {
        name: "Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga",
        ministry: "Kementerian Perdagangan RI",
        whatsapp: "+62 853 1111 1010",
      },
      informationLinks: [
        { title: "Syarat dan Ketentuan", href: "" },
        { title: "Tentang Kami", href: "" },
        { title: "Kebijakan Privasi", href: "" },
        { title: "Lokasi Toko", href: "" },
        { title: "Hubungi Kami", href: "" },
      ],
      socialMedia: {
        instagram: "https://www.instagram.com/zarifascarves",
        tiktok:
          "https://www.tiktok.com/@zarifa.collection?_t=ZS-90hZ0jaUXcV&_r=1",
      },
      copyright: "ZARIFA COLLECTION",
    };

    setData(dummyData);
  }, []);

  if (!data) return null;

  return (
    <footer className="border-t border-gray-200 py-10 text-gray-700 text-sm bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* === Bagian kiri: Layanan Pengaduan Konsumen === */}
        <div>
          <h3 className="font-semibold text-sm tracking-widest mb-4">
            {data.company.name}
          </h3>
          <div className="space-y-3">
            <div className="mb-3 tracking-wider">
              <p>CS dan pengaduan</p>
              <p>{data.company.cs}</p>
              <p>{data.company.email}</p>
            </div>
            <div className="mb-3 tracking-wider">
              <p>Pengajuan kerja sama </p>
              <p>{data.company.cooperation}</p>
            </div>
            <div className="mb-3 tracking-wider">
              <p className="font-semibold">{data.consumerProtection.name}</p>
              <p>{data.consumerProtection.ministry}</p>
              <p>
                WhatsApp :{" "}
                <span className="font-semibold">
                  {data.consumerProtection.whatsapp}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* === Bagian tengah: Informasi === */}
        <div>
          <h3 className="font-semibold text-sm tracking-widest mb-4">
            INFORMASI
          </h3>
          <ul className="space-y-2 tracking-wider">
            {data.informationLinks.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="hover:text-[#4B1E32] transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* === Bagian kanan: Sosial Media === */}
        <div>
          <h3 className="font-semibold text-sm tracking-widest mb-4">
            SOSIAL MEDIA
          </h3>
          <p className="text-gray-600 mb-4 tracking-wider">
            Ikuti kami untuk mendapatkan informasi terbaru, promo, dan
            inspirasi.
          </p>
          <div className="flex flex-col gap-4">
            {data.socialMedia.instagram && (
              <Link href={data.socialMedia.instagram} target="_blank">
                <div className="flex items-center gap-2 ">
                  <Image
                    src="/instagram.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                  />
                  <span className="mb-1">zarifascarves</span>
                </div>
              </Link>
            )}
            {data.socialMedia.tiktok && (
              <Link href={data.socialMedia.tiktok} target="_blank">
                <div className="flex items-center gap-2 ">
                  <Image
                    src="/tiktok.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                  />
                  <span className="mb-1">zarifa.collection</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} - {data.copyright}
      </div>
    </footer>
  );
}
