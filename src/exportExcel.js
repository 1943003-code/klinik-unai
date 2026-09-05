import * as XLSX from 'xlsx-js-style'

const rupiahHeaders = new Set([
  'Harga','HargaBeli','Harga_Jual','Subtotal','Diskon','Pajak','Total','Nilai','Omzet','Dibayar','Sisa',
  'HARGA APOTIK','HARGA DASAR','HARGA KHUSUS (PAKET TINDAKAN)'
])
const integerHeaders = new Set(['Qty','Stok','StokSistem','StokFisik','Selisih','Transaksi','JumlahItem','TotalBatch','AdaSelisih','SisaHari','Min','Max'])

const safeSheetName = (name='Laporan') => String(name).replace(/[\\/?*\[\]:]/g,' ').slice(0,31) || 'Laporan'

export function exportXlsx(filename, rows, options={}) {
  if (!rows?.length) return alert('Tidak ada data untuk diexport')
  const headers = Object.keys(rows[0])
  const ws = XLSX.utils.json_to_sheet(rows, { header: headers })
  const range = XLSX.utils.decode_range(ws['!ref'])

  for (let c = range.s.c; c <= range.e.c; c++) {
    const cell = ws[XLSX.utils.encode_cell({r:0,c})]
    if (!cell) continue
    cell.s = {font:{bold:true,color:{rgb:'FFFFFF'}},fill:{fgColor:{rgb:'1F4E78'}},alignment:{horizontal:'center',vertical:'center'},border:{top:{style:'thin',color:{rgb:'D9E2F3'}},bottom:{style:'thin',color:{rgb:'D9E2F3'}},left:{style:'thin',color:{rgb:'D9E2F3'}},right:{style:'thin',color:{rgb:'D9E2F3'}}}}
  }
  for (let r = 1; r <= range.e.r; r++) for (let c = range.s.c; c <= range.e.c; c++) {
    const addr=XLSX.utils.encode_cell({r,c}),cell=ws[addr]; if(!cell)continue; const h=headers[c]
    cell.s={...(cell.s||{}),alignment:{vertical:'top',wrapText:true},border:{top:{style:'thin',color:{rgb:'E7E6E6'}},bottom:{style:'thin',color:{rgb:'E7E6E6'}},left:{style:'thin',color:{rgb:'E7E6E6'}},right:{style:'thin',color:{rgb:'E7E6E6'}}}}
    if (rupiahHeaders.has(h)||/harga|subtotal|diskon|pajak|total|omzet|dibayar|sisa|nilai/i.test(h)){if(typeof cell.v==='number')cell.z='[$Rp-421] #,##0'} else if(integerHeaders.has(h)||/^qty$/i.test(h)){if(typeof cell.v==='number')cell.z='#,##0'}
  }
  ws['!cols']=headers.map((h,i)=>{let max=String(h).length;for(let r=1;r<=range.e.r;r++){const v=ws[XLSX.utils.encode_cell({r,c:i})]?.v;max=Math.max(max,String(v??'').length)}return{wch:Math.min(Math.max(max+2,10),36)}})
  ws['!autofilter']={ref:XLSX.utils.encode_range({s:{r:0,c:0},e:{r:range.e.r,c:range.e.c}})}
  ws['!freeze']={xSplit:0,ySplit:1,topLeftCell:'A2',activePane:'bottomLeft',state:'frozen'}
  const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,safeSheetName(options.sheetName||'Laporan'));XLSX.writeFile(wb,filename.endsWith('.xlsx')?filename:`${filename}.xlsx`,{bookType:'xlsx',cellStyles:true})
}
