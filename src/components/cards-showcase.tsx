"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PrismDecoration from "@/components/prism-decoration";

interface CardInfo {
  id: string;
  name: string;
  bank: string;
  tagline: string;
  color: string;
  gradient: string;
  joiningFee: string;
  annualFee: string;
  feeWaiver: string;
  rewards: string;
  features: string[];
  applyUrl: string;
}

const bankTabs = [
  { id: "axis", label: "AXIS BANK" },
  { id: "hdfc", label: "HDFC BANK" },
  { id: "icici", label: "ICICI BANK" },
  { id: "sbi", label: "SBI" },
  { id: "yes", label: "YES BANK" },
  { id: "idfc", label: "IDFC FIRST" },
  { id: "au", label: "AU BANK" },
];

const cards: Record<string, CardInfo[]> = {
  axis: [
    {
      id: "axis-ace", name: "ACE Credit Card", bank: "Axis Bank",
      tagline: "5% cashback on utility bills & Google Pay",
      color: "#6f879c", gradient: "",
      joiningFee: "₹499", annualFee: "₹499", feeWaiver: "Spend ₹1.5L/year",
      rewards: "5% cashback on utilities, 4% on Swiggy/Zomato/Ola, 1.5% on others",
      features: ["5% cashback on utility bills & Google Pay recharges","4% cashback on Swiggy, Zomato & Ola","4 complimentary domestic lounge visits/year","1% fuel surcharge waiver up to ₹500/cycle","Up to 15% off on EazyDiner","Contactless payments up to ₹5,000"],
      applyUrl: "https://www.axisbank.com/cards/credit-card/axis-bank-ace-credit-card",
    },
    {
      id: "axis-flipkart", name: "Flipkart Axis Bank", bank: "Axis Bank",
      tagline: "Unlimited 5% cashback on Flipkart & Myntra",
      color: "#6f879c", gradient: "",
      joiningFee: "₹500", annualFee: "₹500", feeWaiver: "Spend ₹2L/year",
      rewards: "5% on Flipkart/Myntra, 4% on Uber/Swiggy, 1.5% on others",
      features: ["5% unlimited cashback on Flipkart & Myntra","4% cashback on Uber, Swiggy, PVR","1.5% cashback on all other spends","₹250 Flipkart voucher on card activation","1% fuel surcharge waiver","Zero lost card liability"],
      applyUrl: "https://www.axisbank.com/cards/credit-card/compare-credit-cards",
    },
    {
      id: "axis-magnus", name: "Magnus Credit Card", bank: "Axis Bank",
      tagline: "25 EDGE Reward Points per ₹200 spent",
      color: "#6f879c", gradient: "",
      joiningFee: "₹10,000", annualFee: "₹10,000", feeWaiver: "Spend ₹10L/year",
      rewards: "25 EDGE points/₹200 (base), 35 points/₹200 (accelerated after ₹1.5L/month)",
      features: ["25 EDGE Reward Points per ₹200 spent","35 EDGE points per ₹200 after ₹1.5L monthly spends","12 complimentary domestic lounge visits/year","Unlimited international lounge access via Priority Pass","Airport transfer & meet-and-greet services","₹5,000 travel voucher every anniversary year","1% fuel surcharge waiver","Concierge service & golf privileges"],
      applyUrl: "https://www.axisbank.com/cards/credit-card/compare-credit-cards",
    },
    {
      id: "axis-airtel", name: "Airtel Axis Bank", bank: "Axis Bank",
      tagline: "25% cashback on Airtel bills",
      color: "#6f879c", gradient: "",
      joiningFee: "₹500", annualFee: "₹500", feeWaiver: "Spend ₹2L/year",
      rewards: "25% on Airtel bills, 10% on utilities via Airtel Thanks App, 1% on others",
      features: ["25% cashback on Airtel mobile & DTH bills","10% cashback on utility bills via Airtel Thanks App","₹250 Amazon voucher on first transaction","1% fuel surcharge waiver","Zero lost card liability","Interest-free credit up to 50 days"],
      applyUrl: "https://www.axisbank.com/cards/credit-card/compare-credit-cards",
    },
  ],
  hdfc: [
    {
      id: "hdfc-millennia", name: "Millennia Credit Card", bank: "HDFC Bank",
      tagline: "5% cashback on Amazon, Flipkart & Swiggy",
      color: "#6f879c", gradient: "",
      joiningFee: "₹1,000", annualFee: "₹1,000", feeWaiver: "Spend ₹1L/year",
      rewards: "5% cashback on Amazon, Flipkart, Swiggy, Uber, 1% on others",
      features: ["5% cashback on Amazon, Flipkart, Myntra, Swiggy","5% cashback on Uber, BookMyShow, Sony LIV","1% cashback on all other eligible spends","Cashback credited as redeemable reward points","1% fuel surcharge waiver up to ₹3,500/cycle","Digital card instant issuance","Interest-free credit up to 50 days"],
      applyUrl: "https://www.hdfcbank.com/ps/credit-cards/millennia-credit-card",
    },
    {
      id: "hdfc-regalia-gold", name: "Regalia Gold Credit Card", bank: "HDFC Bank",
      tagline: "Premium travel & lifestyle card",
      color: "#6f879c", gradient: "",
      joiningFee: "₹2,500", annualFee: "₹2,500", feeWaiver: "Spend ₹3L/year",
      rewards: "4 reward points per ₹150 (~2% via SmartBuy), 10X on SmartBuy",
      features: ["4 reward points per ₹150 spent","10X reward points via SmartBuy portal","8 complimentary domestic lounge visits/year","6 complimentary international lounge visits/year","Priority Pass membership included","Travel insurance up to ₹1 crore","1% fuel surcharge waiver","Concierge & golf benefits"],
      applyUrl: "https://www.hdfcbank.com/ps/credit-cards/regalia-gold-credit-card",
    },
    {
      id: "hdfc-infinia", name: "Infinia Metal Edition", bank: "HDFC Bank",
      tagline: "India's most premium credit card",
      color: "#6f879c", gradient: "",
      joiningFee: "₹12,500", annualFee: "₹12,500", feeWaiver: "Spend ₹10L/year",
      rewards: "5 reward points per ₹150 (~3.3% via SmartBuy), unlimited lounge",
      features: ["5 reward points per ₹150 spent","Unlimited domestic & international lounge access","Priority Pass membership with guest access","₹10,000 travel voucher every anniversary year","Complimentary golf rounds across India","Concierge service available 24/7","Purchase protection & return cover","Metal card construction","Invite-only issuance"],
      applyUrl: "https://www.hdfcbank.com/ps/credit-cards/infinia-credit-card",
    },
    {
      id: "hdfc-swiggy", name: "Swiggy HDFC Bank", bank: "HDFC Bank",
      tagline: "10% cashback on Swiggy app spends",
      color: "#6f879c", gradient: "",
      joiningFee: "₹500", annualFee: "₹500", feeWaiver: "Spend ₹2L/year",
      rewards: "10% on Swiggy, 5% on online spends, 1% on others",
      features: ["10% cashback on Swiggy (Food, Instamart, Dineout)","5% cashback on online spends across merchants","1% cashback on all other expenses","3 months free Swiggy One membership","Cashback credited directly as statement credit","1% fuel surcharge waiver"],
      applyUrl: "https://www.hdfcbank.com/ps/credit-cards/swiggy-credit-card",
    },
  ],
  icici: [
    {
      id: "icici-amazon-pay", name: "Amazon Pay ICICI", bank: "ICICI Bank",
      tagline: "5% cashback on Amazon — lifetime free",
      color: "#6f879c", gradient: "",
      joiningFee: "₹0", annualFee: "₹0", feeWaiver: "Lifetime free",
      rewards: "5% on Amazon (Prime), 3% on Amazon Pay bills, 1% on others",
      features: ["5% cashback on Amazon for Prime members","3% cashback on Amazon Pay bill payments","1% cashback on all other spends","Lifetime free — no joining or annual fee","Cashback as Amazon Pay balance, auto-redeemed","Fuel surcharge waiver up to ₹250/cycle","Zero lost card liability","Interest-free credit up to 50 days"],
      applyUrl: "https://www.amazon.in/gp/cobrandcard/page/icici",
    },
    {
      id: "icici-sapphiro", name: "Sapphiro Credit Card", bank: "ICICI Bank",
      tagline: "Premium lifestyle with international lounge access",
      color: "#6f879c", gradient: "",
      joiningFee: "₹3,500", annualFee: "₹3,500", feeWaiver: "Spend ₹2.5L/year",
      rewards: "4 reward points per ₹100, 2X on select categories",
      features: ["4 reward points per ₹100 spent","4X rewards on international spends","6 complimentary lounge visits/year (domestic + intl)","Buy 1 Get 1 on BookMyShow & INOX","Complimentary DragonPass membership","Golf privileges at select courses","Concierge service available","Fuel surcharge waiver"],
      applyUrl: "https://www.icicibank.com/personal-banking/cards/credit-cards/sapphiro-credit-card",
    },
    {
      id: "icici-emeralde", name: "Emeralde Credit Card", bank: "ICICI Bank",
      tagline: "Unlimited lounge access & super-premium perks",
      color: "#6f879c", gradient: "",
      joiningFee: "₹12,000", annualFee: "₹12,000", feeWaiver: "Spend ₹15L/year",
      rewards: "5 reward points per ₹100, unlimited lounge access",
      features: ["5 reward points per ₹100 spent","Unlimited domestic lounge access","Unlimited international lounge access","Complimentary rounds of golf","Global concierge service 24/7","₹10,000 travel credit every year","Purchase protection & return cover","Dedicated relationship manager"],
      applyUrl: "https://www.icicibank.com/personal-banking/cards/credit-cards/emeralde-credit-card",
    },
    {
      id: "icici-coral", name: "Coral Credit Card", bank: "ICICI Bank",
      tagline: "Great entry-level card with movie benefits",
      color: "#6f879c", gradient: "",
      joiningFee: "₹500", annualFee: "₹500", feeWaiver: "Spend ₹1.5L/year",
      rewards: "2 reward points per ₹100, milestone bonus points",
      features: ["2 reward points per ₹100 spent","Up to 10,000 bonus reward points per year","25% off on BookMyShow & INOX (twice/month)","1 complimentary railway lounge access/quarter","1% fuel surcharge waiver","Interest-free credit up to 50 days","Zero lost card liability"],
      applyUrl: "https://www.icicibank.com/personal-banking/cards/credit-cards/coral-credit-card",
    },
  ],
  sbi: [
    {
      id: "sbi-cashback", name: "SBI Cashback Card", bank: "SBI",
      tagline: "5% cashback on all online spends",
      color: "#6f879c", gradient: "",
      joiningFee: "₹999", annualFee: "₹999", feeWaiver: "Spend ₹2L/year",
      rewards: "5% cashback on online spends (cap ₹500/month), 1% on others",
      features: ["5% cashback on all online spends (max ₹500/month)","1% cashback on offline & other spends","Welcome benefit of ₹1,000 Amazon voucher","Cashback credited as statement credit","1% fuel surcharge waiver up to ₹500/cycle","Digital card instant issuance","Contactless payments up to ₹5,000","No cost EMI on eligible purchases"],
      applyUrl: "https://www.sbi.co.in/cards/credit-card/sbi-cashback-card",
    },
    {
      id: "sbi-simplyclick", name: "SBI SimplyCLICK", bank: "SBI",
      tagline: "5X rewards on Amazon, Flipkart & BookMyShow",
      color: "#6f879c", gradient: "",
      joiningFee: "₹499", annualFee: "₹499", feeWaiver: "Spend ₹1L/year",
      rewards: "5X reward points on Amazon, Flipkart, BookMyShow, Sony LIV; 2X on others",
      features: ["5X reward points on Amazon, Flipkart, BookMyShow","2X reward points on all other spends","₹750 Amazon voucher on card anniversary","Complimentary lounge access at select airports","1% fuel surcharge waiver","Zero lost card liability","Interest-free credit up to 50 days"],
      applyUrl: "https://www.sbi.co.in/cards/credit-card/sbi-simplyclick-card",
    },
    {
      id: "sbi-elite", name: "SBI Elite Credit Card", bank: "SBI",
      tagline: "Premium lifestyle with 12 lounge visits/year",
      color: "#6f879c", gradient: "",
      joiningFee: "₹4,999", annualFee: "₹4,999", feeWaiver: "Spend ₹5L/year",
      rewards: "2 reward points per ₹100, 10X on Yatra & partner brands",
      features: ["2 reward points per ₹100 spent","10X reward points via Yatra, Shoppers Stop, others","12 complimentary domestic lounge visits/year","6 complimentary international lounge visits/year","₹1,000 Yatra voucher on renewal","6 complimentary golf rounds per year","Travel insurance up to ₹1 crore","1% fuel surcharge waiver"],
      applyUrl: "https://www.sbi.co.in/cards/credit-card/sbi-elite-card",
    },
  ],
  yes: [
    {
      id: "yes-prosperity", name: "YES PROSPERITY Card", bank: "YES Bank",
      tagline: "10% cashback on utilities & groceries",
      color: "#6f879c", gradient: "",
      joiningFee: "₹999", annualFee: "₹999", feeWaiver: "Spend ₹1.5L/year",
      rewards: "10% on utilities & groceries (max ₹350/month), 1% on others",
      features: ["10% cashback on utilities, groceries & dining (cap ₹350/month)","1% cashback on all other spends","4 complimentary domestic lounge visits/year","₹500 Amazon voucher on first transaction","1% fuel surcharge waiver up to ₹500/cycle","Zero lost card liability","Contactless payments up to ₹5,000"],
      applyUrl: "https://www.yesbank.in/personal-banking/cards/credit-card/yes-prosperity-card",
    },
    {
      id: "yes-marquee", name: "YES Marquee Card", bank: "YES Bank",
      tagline: "Unlimited lounge & 10X on travel",
      color: "#6f879c", gradient: "",
      joiningFee: "₹4,999", annualFee: "₹4,999", feeWaiver: "Spend ₹6L/year",
      rewards: "6 reward points per ₹200, 10X on travel via YES Travel Edge",
      features: ["6 reward points per ₹200 spent","10X reward points on travel via YES Travel Edge","Unlimited domestic lounge access","6 international lounge visits/year","Complimentary golf lessons & rounds","₹5,000 travel voucher on renewal","Concierge service 24/7","Travel insurance up to ₹2 crore"],
      applyUrl: "https://www.yesbank.in/personal-banking/cards/credit-card/yes-marquee-card",
    },
    {
      id: "yes-ace", name: "YES ACE Credit Card", bank: "YES Bank",
      tagline: "5% cashback on Amazon & Swiggy",
      color: "#6f879c", gradient: "",
      joiningFee: "₹499", annualFee: "₹499", feeWaiver: "Spend ₹1L/year",
      rewards: "5% on Amazon/Swiggy/Zomato, 1% on others, no cap",
      features: ["5% cashback on Amazon, Swiggy & Zomato","1% cashback on all other spends — no cap","4 complimentary domestic lounge visits/year","₹250 Amazon voucher on card activation","1% fuel surcharge waiver","Zero lost card liability","Interest-free credit up to 50 days"],
      applyUrl: "https://www.yesbank.in/personal-banking/cards/credit-card/yes-ace-card",
    },
  ],
  idfc: [
    {
      id: "idfc-select", name: "IDFC FIRST Select", bank: "IDFC FIRST Bank",
      tagline: "Lifetime free with 4X rewards on dining & travel",
      color: "#6f879c", gradient: "",
      joiningFee: "₹0", annualFee: "₹0", feeWaiver: "Lifetime free",
      rewards: "4X rewards on dining, travel & entertainment; 2X on others",
      features: ["Lifetime free — no joining or annual fee","4X reward points on dining, travel & entertainment","2X reward points on all other spends","Complimentary domestic lounge access (4/year)","1% fuel surcharge waiver","Zero lost card liability","Insta EMI at 0% processing fee","Digital card on IDFC FIRST app"],
      applyUrl: "https://www.idfcfirstbank.com/credit-card/first-select-credit-card",
    },
    {
      id: "idfc-wealth", name: "IDFC FIRST Wealth", bank: "IDFC FIRST Bank",
      tagline: "Premium metal card with unlimited lounge",
      color: "#6f879c", gradient: "",
      joiningFee: "₹4,999", annualFee: "₹4,999", feeWaiver: "Spend ₹5L/year",
      rewards: "10X rewards on dining, travel & entertainment; 4X on others",
      features: ["10X reward points on dining, travel & entertainment","4X reward points on all other spends","Unlimited domestic lounge access","6 international lounge visits/year","Metal card construction","₹3,000 travel voucher on anniversary","Personal concierge service","Golf access at premium courses"],
      applyUrl: "https://www.idfcfirstbank.com/credit-card/first-wealth-credit-card",
    },
    {
      id: "idfc-power", name: "IDFC FIRST Power", bank: "IDFC FIRST Bank",
      tagline: "Best fuel card — 5% surcharge waiver",
      color: "#6f879c", gradient: "",
      joiningFee: "₹499", annualFee: "₹499", feeWaiver: "Spend ₹1L/year",
      rewards: "5% fuel surcharge waiver (max ₹500/cycle), 1% cashback on fuel",
      features: ["5% fuel surcharge waiver on all fuel spends (max ₹500/cycle)","1% cashback on fuel transactions","2X reward points on fuel, groceries & utilities","2 complimentary domestic lounge visits/quarter","Free EMIs on fuel purchases","Zero lost card liability","Contactless payments up to ₹5,000"],
      applyUrl: "https://www.idfcfirstbank.com/credit-card/first-power-credit-card",
    },
  ],
  au: [
    {
      id: "au-lit", name: "LIT Credit Card", bank: "AU Bank",
      tagline: "India's 1st customizable credit card",
      color: "#6f879c", gradient: "",
      joiningFee: "₹249", annualFee: "₹249", feeWaiver: "Spend ₹1L/year",
      rewards: "Up to 10X reward points on chosen categories, 1% fuel waiver",
      features: ["Up to 10X reward points on selected categories","Customizable benefits (choose your perks)","3-month ZEE5 & Amazon Prime memberships","₹200 Amazon Pay voucher on milestone","1% fuel surcharge waiver up to ₹150","Contactless payments up to ₹5,000","Milestone cashback up to 5% on retail spends"],
      applyUrl: "https://www.au.bank.in/personal-banking/credit-cards/lit-credit-card",
    },
    {
      id: "au-ixigo", name: "ixigo AU Credit Card", bank: "AU Bank",
      tagline: "Endless rewards for travel lovers",
      color: "#6f879c", gradient: "",
      joiningFee: "₹0", annualFee: "₹0", feeWaiver: "Lifetime free",
      rewards: "2.5% rewards on every ₹200, 5,000 bonus points per quarter",
      features: ["2.5% rewards on every ₹200 spent","Up to 10% off on hotels, flights & bus via ixigo","Zero forex mark-up charges","16 domestic airport lounge visits/year","1 international lounge visit/year","2 railway lounge visits/quarter","5,000 bonus points per quarter on ₹75K spends","1% fuel surcharge waiver up to ₹250"],
      applyUrl: "https://www.au.bank.in/personal-banking/credit-cards/ixigo-au-credit-card",
    },
    {
      id: "au-spont", name: "SPONT Credit Card", bank: "AU Bank",
      tagline: "1% cashback on everything — even UPI",
      color: "#6f879c", gradient: "",
      joiningFee: "₹299", annualFee: "₹299", feeWaiver: "Spend ₹90K/year",
      rewards: "1% cashback on all spends including UPI, never-expiring coins",
      features: ["1% cashback on ALL transactions (eComm, POS, UPI)","Earn coins on UPI transactions, never expire","2 complimentary railway lounge access/quarter","2 domestic airport lounge visits/quarter","1% fuel surcharge waiver up to ₹100/cycle","Virtual card instantly on AU 0101 app","PIN-less payments up to ₹5,000"],
      applyUrl: "https://www.au.bank.in/personal-banking/credit-cards/au-spont-credit-card",
    },
    {
      id: "au-ananta", name: "Ananta Credit Card", bank: "AU Bank",
      tagline: "Premium rewards for high spenders",
      color: "#6f879c", gradient: "",
      joiningFee: "₹2,000", annualFee: "₹2,000", feeWaiver: "Spend ₹3L/year",
      rewards: "Up to 5 reward points per ₹100 — 5X on shopping, dining & travel",
      features: ["Up to 5 reward points per ₹100 spent","5X rewards on shopping, dining & travel","4 complimentary domestic lounge visits/quarter","Welcome benefit of 8,000 reward points","Up to 50,000 milestone points on ₹10L spends","1% fuel surcharge waiver","Premium concierge service","Zero lost card liability"],
      applyUrl: "https://www.au.bank.in/personal-banking/credit-cards",
    },
  ],
};

export default function CardsShowcase() {
  const [activeBank, setActiveBank] = useState("axis");
  const [activeCard, setActiveCard] = useState("axis-ace");

  const currentCards = cards[activeBank] ?? cards.axis;
  const selected = currentCards.find((c) => c.id === activeCard) ?? currentCards[0];

  return (
    <section id="cards" className="relative min-h-screen bg-slate-veil/60 px-8 py-[108px] overflow-hidden">
      <PrismDecoration count={2} variant="subtle" />
      <div className="relative z-10 max-w-[1400px]">
        <div className="section-number mb-6">
          <span className="text-[14px] font-[400] text-bone-white/50 tracking-[0.02em]">
            / 01
          </span>
        </div>

        <h2 className="text-[56px] sm:text-[105px] font-[400] text-bone-white leading-[1.0] tracking-[-0.02em] max-w-[1000px]">
          Choose your
          <br />
          <span className="font-[700]">bank.</span>
        </h2>

        <p className="mt-6 text-[18px] font-[400] text-bone-white/60 leading-[1.5] max-w-[500px]">
          16 credit cards from 4 leading Indian banks. One page.
        </p>

        <div className="mt-16 flex flex-wrap gap-[15px]">
          {bankTabs.map((bank) => (
            <button
              key={bank.id}
              onClick={() => { setActiveBank(bank.id); setActiveCard(cards[bank.id][0]?.id ?? ""); }}
              className={cn(
                "text-[14px] font-[400] px-[15px] py-[9px] border transition-colors duration-300 tracking-[0.02em]",
                activeBank === bank.id
                  ? "text-bone-white border-bone-white"
                  : "text-bone-white/50 border-transparent hover:text-bone-white/80 hover:border-bone-white/30"
              )}
            >
              {bank.label}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-[10px]">
          {currentCards.map((card) => (
            <button
              key={card.id}
              onClick={() => setActiveCard(card.id)}
              className={cn(
                "text-[14px] font-[400] px-[12px] py-[6px] border transition-colors duration-300 tracking-[0.02em]",
                activeCard === card.id
                  ? "text-gunmetal-blue border-gunmetal-blue"
                  : "text-bone-white/40 border-transparent hover:text-bone-white/70"
              )}
            >
              {card.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-16 grid lg:grid-cols-2 gap-16"
          >
            <div>
              <span className="text-[14px] font-[400] text-gunmetal-blue tracking-[0.02em]">
                {selected.bank}
              </span>
              <h3 className="text-[56px] font-[400] text-bone-white leading-[1.0] tracking-[-0.02em] mt-2">
                {selected.name}
              </h3>
              <p className="text-[18px] font-[400] text-bone-white/60 mt-6 leading-[1.5]">
                {selected.tagline}
              </p>

              <div className="mt-10 grid grid-cols-2 gap-8">
                <div>
                  <span className="text-[14px] font-[400] text-bone-white/40 tracking-[0.02em]">
                    JOINING FEE
                  </span>
                  <p className="text-[36px] font-[400] text-bone-white leading-[1.0] tracking-[-0.01em] mt-2">
                    {selected.joiningFee}
                  </p>
                </div>
                <div>
                  <span className="text-[14px] font-[400] text-bone-white/40 tracking-[0.02em]">
                    ANNUAL FEE
                  </span>
                  <p className="text-[36px] font-[400] text-bone-white leading-[1.0] tracking-[-0.01em] mt-2">
                    {selected.annualFee}
                  </p>
                </div>
                <div>
                  <span className="text-[14px] font-[400] text-bone-white/40 tracking-[0.02em]">
                    FEE WAIVER
                  </span>
                  <p className="text-[22px] font-[400] text-bone-white leading-[1.2] mt-2">
                    {selected.feeWaiver}
                  </p>
                </div>
              </div>

              <p className="mt-8 text-[15px] font-[400] text-bone-white/50 leading-[1.5] max-w-[400px]">
                {selected.rewards}
              </p>

              <div className="mt-10 flex gap-4">
                <a
                  href={selected.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-[400] text-bone-white border border-bone-white px-[15px] py-[9px] tracking-[0.02em] hover:border-gunmetal-blue hover:text-gunmetal-blue transition-colors duration-300"
                >
                  APPLY NOW
                  <ArrowRight size={14} />
                </a>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(selected.bank + " " + selected.name + " review")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[14px] font-[400] text-gunmetal-blue border border-gunmetal-blue px-[15px] py-[9px] tracking-[0.02em] hover:border-bone-white hover:text-bone-white transition-colors duration-300"
                >
                  REVIEW
                </a>
              </div>
            </div>

            <div>
              <span className="text-[14px] font-[400] text-bone-white/40 tracking-[0.02em]">
                KEY FEATURES
              </span>
              <div className="mt-6 space-y-0">
                {selected.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 py-3 border-b border-bone-white/10"
                  >
                    <span className="size-1.5 rounded-full bg-gunmetal-blue shrink-0" />
                    <span className="text-[15px] font-[400] text-bone-white/70 leading-[1.5]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
