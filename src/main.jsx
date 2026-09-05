import React,{useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Activity,BookOpen,Boxes,Building2,ChevronDown,ClipboardList,CreditCard,FlaskConical,HeartPulse,Home as HomeIcon,LogOut,Menu,PackageSearch,Settings,ShieldCheck,Stethoscope,Users,X} from 'lucide-react'
import Home from './pages/Home'
import Pendaftaran from './pages/Pendaftaran'
import MasterPasien from './pages/MasterPasien'
import MasterTarif from './pages/MasterTarif'
import OperationalModule from './pages/OperationalModule'
import './styles.css'

const modules={
  Dashboard:{title:'Dashboard Klinik',group:'Klinik',description:'Ringkasan operasional Klinik Pratama UNAI.',items:['Kunjungan hari ini','Status antrean','Aktivitas pelayanan','Ringkasan farmasi dan kasir']},
  RME:{title:'Rekam Medis Elektronik',group:'Rawat Jalan',description:'SOAP, diagnosis, tindakan dan resep terintegrasi.',items:['Anamnesis dan pemeriksaan','SOAP','Diagnosis','Tindakan','Resep']},
  RawatInap:{title:'Rawat Inap',group:'Pelayanan',description:'Admisi, bangsal, bed, CPPT dan handover pasien rawat inap.',items:['Admisi pasien','Bangsal dan tempat tidur','CPPT','Asuhan keperawatan','Handover']},
  IGD:{title:'IGD & Triase',group:'Pelayanan',description:'Triase dan pelayanan kegawatdaruratan.',items:['Triase','Tanda vital','Prioritas pasien','Clinical order']},
  Farmasi:{title:'Farmasi',group:'Farmasi',description:'Pengadaan, penerimaan, resep, stok dan mutasi multi-depo.',items:['Resep masuk','Dispensasi','Master obat','Stok & batch','Mutasi stok','Stock opname','Pengadaan & penerimaan']},
  Kasir:{title:'Kasir',group:'Keuangan',description:'Tagihan pelayanan dan pembayaran pasien.',items:['Tagihan pasien','Pembayaran','Invoice','Riwayat transaksi']},
  Laboratorium:{title:'Laboratorium',group:'Penunjang',description:'Order pemeriksaan laboratorium dan hasil terintegrasi.',items:['Master pemeriksaan','Order lab','Item pemeriksaan','Hasil pemeriksaan']},
  Radiologi:{title:'Radiologi',group:'Penunjang',description:'Struktur modul radiologi untuk clinical order dan hasil pemeriksaan.',items:['Order radiologi','Pemeriksaan','Hasil','Integrasi RME']},
  Laporan:{title:'Laporan',group:'Manajemen',description:'Laporan klinik, farmasi, kasir dan pelayanan.',items:['Laporan kunjungan','Laporan farmasi','Laporan pembelian','Laporan stok','Laporan keuangan']},
  Administrator:{title:'Administrator',group:'Sistem',description:'Pengaturan unit, user, hak akses dan konfigurasi sistem.',items:['User & role','Unit pelayanan','Depo farmasi','Hak akses per unit','Audit log','Konfigurasi integrasi']}
}

const groups=[
  {label:'Utama',items:[['Beranda',HomeIcon],['Dashboard',Activity],['Pendaftaran',ClipboardList],['Master Pasien',Users]]},
  {label:'Pelayanan',items:[['RME',BookOpen],['Rawat Inap',Building2],['IGD',HeartPulse]]},
  {label:'Penunjang & Farmasi',items:[['Farmasi',PackageSearch],['Laboratorium',FlaskConical],['Radiologi',Stethoscope]]},
  {label:'Keuangan & Data',items:[['Kasir',CreditCard],['Master Tarif',Boxes],['Laporan',ClipboardList]]},
  {label:'Sistem',items:[['Administrator',Settings]]}
]

function App(){
  const [page,setPage]=useState('Beranda')
  const [open,setOpen]=useState(false)
  const render=()=>{
    if(page==='Beranda') return <Home setPage={setPage}/>
    if(page==='Pendaftaran') return <Pendaftaran/>
    if(page==='Master Pasien') return <MasterPasien/>
    if(page==='Master Tarif') return <MasterTarif/>
    const m=modules[page]
    return m?<OperationalModule {...m}/>:<Home setPage={setPage}/>
  }
  return <div className="app">
    <aside className={`sidebar ${open?'show':''}`}>
      <div className="brand"><div className="brandmark"><ShieldCheck size={24}/></div><div><b>Klinik UNAI</b><span>Sistem Klinik V5.0.0</span></div><button className="mobileclose" onClick={()=>setOpen(false)}><X size={20}/></button></div>
      <div className="clinicpill"><HeartPulse size={17}/><div><b>Klinik Pratama</b><span>Universitas Advent Indonesia</span></div></div>
      <nav>{groups.map(g=><div className="navgroup" key={g.label}><div className="navlabel">{g.label}</div>{g.items.map(([name,Icon])=><button key={name} className={page===name?'active':''} onClick={()=>{setPage(name);setOpen(false)}}><Icon size={17}/><span>{name}</span></button>)}</div>)}</nav>
      <div className="sidefoot"><div className="version"><ShieldCheck size={15}/><span>Connected to Supabase</span></div></div>
    </aside>
    {open&&<div className="overlay" onClick={()=>setOpen(false)}/>} 
    <main className="main">
      <header className="topbar"><button className="menubtn" onClick={()=>setOpen(true)}><Menu size={20}/></button><div><b>Klinik Pratama UNAI</b><span>Operational Console</span></div><div className="topright"><span className="statusdot"/>Online</div></header>
      <section className="content">{render()}</section>
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
