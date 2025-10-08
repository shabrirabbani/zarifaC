"use client";

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
        cs: "08123456789",
        email: "marketing.zarifa@gmail.id",
        cooperation: "marketing.zarifa@gmail.id",
      },
      consumerProtection: {
        name: "Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga",
        ministry: "Kementerian Perdagangan RI",
        whatsapp: "+62 853 1111 1010",
      },
      informationLinks: [
        { title: "Syarat dan Ketentuan", href: "/terms" },
        { title: "Tentang Kami", href: "/about" },
        { title: "Kebijakan Privasi", href: "/privacy" },
        { title: "Lokasi Toko", href: "/stores" },
        { title: "Hubungi Kami", href: "/contact" },
      ],
      socialMedia: {
        facebook: "https://facebook.com/elzatta",
        instagram: "https://instagram.com/elzatta",
        youtube: "https://youtube.com/elzatta",
        tiktok: "https://tiktok.com/@elzatta",
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
          <h3 className="font-semibold text-xs tracking-widest mb-4">
            {data.company.name}
          </h3>
          <div className="space-y-3">
            <div>
              <p>CS dan pengaduan: {data.company.cs}</p>
              <p>Pengajuan kerja sama: {data.company.cooperation}</p>
            </div>
            <div>
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
          <h3 className="font-semibold text-xs tracking-widest mb-4">
            INFORMASI
          </h3>
          <ul className="space-y-2">
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
          <h3 className="font-semibold text-xs tracking-widest mb-4">
            SOSIAL MEDIA
          </h3>
          <p className="text-gray-600 mb-4">
            Ikuti kami untuk mendapatkan informasi terbaru, promo, dan
            inspirasi.
          </p>
          <div className="flex flex-col gap-4">
            {data.socialMedia.facebook && (
              <Link href={data.socialMedia.facebook} target="_blank">
                <span className="text-gray-600 hover:text-[#4B1E32] text-sm">
                  Facebook
                </span>
              </Link>
            )}
            {data.socialMedia.instagram && (
              <Link href={data.socialMedia.instagram} target="_blank">
                <span className="text-gray-600 hover:text-[#4B1E32] text-sm">
                  Instagram
                </span>
              </Link>
            )}
            {data.socialMedia.youtube && (
              <Link href={data.socialMedia.youtube} target="_blank">
                <span className="text-gray-600 hover:text-[#4B1E32] text-sm">
                  YouTube
                </span>
              </Link>
            )}
            {data.socialMedia.tiktok && (
              <Link href={data.socialMedia.tiktok} target="_blank">
                <span className="text-gray-600 hover:text-[#4B1E32] text-sm">
                  TikTok
                </span>
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
