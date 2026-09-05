import React from 'react'
import {X,Search,Save} from 'lucide-react'
export const Btn=({children,kind='primary',...p})=><button className={`btn ${kind}`} {...p}>{children}</button>
export const Page=({title,sub,actions,children})=><><div className="pagehead"><div><h1>{title}</h1><p>{sub}</p></div><div className="toolbar">{actions}</div></div>{children}</>
export const SearchBox=({value,onChange,placeholder='Cari...'})=><div className="search"><Search size={16}/><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></div>
export const Field=({f,setF,k,label,type='text',options,span='',placeholder=''})=><label className={`field ${span}`}><span>{label}</span>{options?<select value={f[k]??''} onChange={e=>setF({...f,[k]:e.target.value})}><option value="">Pilih</option>{options.map(o=>typeof o==='string'?<option key={o}>{o}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}</select>:type==='textarea'?<textarea rows="3" value={f[k]??''} onChange={e=>setF({...f,[k]:e.target.value})} placeholder={placeholder}/>:<input type={type} value={f[k]??''} onChange={e=>setF({...f,[k]:e.target.value})} placeholder={placeholder}/>}</label>
export const Modal=({title,onClose,onSave,children,save='Simpan'})=><div className="modalbg"><div className="modal"><div className="modalhead"><b>{title}</b><Btn kind="ghost" onClick={onClose}><X size={17}/></Btn></div><div className="modalbody">{children}</div><div className="modalfoot"><Btn kind="secondary" onClick={onClose}>Batal</Btn>{onSave&&<Btn onClick={onSave}><Save size={16}/>{save}</Btn>}</div></div></div>
export const Table=({heads,children})=><div className="tablewrap"><table><thead><tr>{heads.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{children}</tbody></table></div>
export const Empty=({text='Belum ada data'})=><div className="empty">{text}</div>
export const money=n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(n||0))
export const dt=v=>v?new Date(v).toLocaleString('id-ID'):'-'
export const d=v=>v?new Date(v).toLocaleDateString('id-ID'):'-'
export const uid=p=>`${p}-${Date.now()}-${Math.random().toString(36).slice(2,5).toUpperCase()}`
