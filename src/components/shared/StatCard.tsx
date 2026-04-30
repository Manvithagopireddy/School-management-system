import { motion } from 'motion/react';
import type { ElementType } from 'react';

interface StatCardProps {
  icon: ElementType;
  value: string;
  label: string;
  sub: string;
  color: string;
  delay?: number;
}

const StatCard = ({ icon: Icon, value, label, sub, color, delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="card-nexus p-7 shadow-xl shadow-black/10 group hover:scale-[1.02] transition-transform"
  >
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
      style={{ background: `${color}18` }}
    >
      <Icon size={26} style={{ color }} />
    </div>
    <p className="text-3xl font-black tracking-tighter mb-1 text-white">{value}</p>
    <p className="text-[11px] text-muted font-bold uppercase tracking-widest">{label}</p>
    <p className="text-[10px] mt-2 font-bold" style={{ color }}>{sub}</p>
  </motion.div>
);

export default StatCard;
