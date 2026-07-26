export interface Model {
  id: string
  name: string
  tagline: string
  initial: string
  gradientFrom: string
  gradientTo: string
  img: string
  imgWin: string
  link: string
  online: boolean
}

const AV = (seed: string) =>
  `https://api.dicebear.com/9.x/lorelei/png?size=400&seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf`

export const MODELS: Model[] = [
  { id:'1', name:'אדל דהן',     tagline:'החיוך שיגרום לך לשכוח איך קוראים לך',  initial:'א', gradientFrom:'#ff2e88', gradientTo:'#7a1fa2', img:'images/adel.jpg',  imgWin:'images/adel.jpg',  link:'https://onlyfans.com/PLACEHOLDER1', online:true  },
  { id:'2', name:'זאיה',        tagline:"מתוקה בצ'אט. פחות מתוקה כשנשארים לבד", initial:'ז', gradientFrom:'#a855f7', gradientTo:'#312e81', img:AV('zaya'),         imgWin:AV('zaya-win'),     link:'https://onlyfans.com/PLACEHOLDER2', online:true  },
  { id:'3', name:'קארן',        tagline:'עונה לכל הודעה. תבדוק אותה',            initial:'ק', gradientFrom:'#f43f5e', gradientTo:'#831843', img:'images/karen.jpg', imgWin:'images/karen.jpg', link:'https://onlyfans.com/PLACEHOLDER3', online:false },
  { id:'4', name:'תרצה',        tagline:'הצד השובב שלה שמור למי שנכנס',          initial:'ת', gradientFrom:'#f59e0b', gradientTo:'#b91c1c', img:AV('tirza'),        imgWin:AV('tirza-win'),    link:'https://onlyfans.com/PLACEHOLDER4', online:true  },
  { id:'5', name:'מריאל',       tagline:'אומרים שהיא ממכרת. הוזהרת',             initial:'מ', gradientFrom:'#06b6d4', gradientTo:'#4c1d95', img:AV('mariel'),       imgWin:AV('mariel-win'),   link:'https://onlyfans.com/PLACEHOLDER5', online:true  },
  { id:'6', name:'נטלי',        tagline:'שקטה בהתחלה. רק בהתחלה',                initial:'נ', gradientFrom:'#ec4899', gradientTo:'#1e1b4b', img:AV('natali'),       imgWin:AV('natali-win'),   link:'https://onlyfans.com/PLACEHOLDER6', online:false },
  { id:'7', name:'תמר אמונה',   tagline:'הפרופיל שכולם חוזרים אליו',              initial:'ת', gradientFrom:'#8b5cf6', gradientTo:'#701a75', img:'images/tamar.jpg', imgWin:'images/tamar.jpg', link:'https://onlyfans.com/PLACEHOLDER7', online:true  },
  { id:'8', name:'מילאן',       tagline:'תשאל אותה משהו. היא תפתיע אותך',         initial:'מ', gradientFrom:'#ff2e88', gradientTo:'#0f172a', img:AV('milan'),        imgWin:AV('milan-win'),    link:'https://onlyfans.com/PLACEHOLDER8', online:true  },
  { id:'9', name:'בר סימן טוב', tagline:'היא כבר יודעת שתכתוב לה',                initial:'ב', gradientFrom:'#f5c542', gradientTo:'#9a3412', img:AV('bar'),          imgWin:AV('bar-win'),      link:'https://onlyfans.com/PLACEHOLDER9', online:true  },
]
