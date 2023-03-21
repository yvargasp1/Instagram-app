export default function Photos({photos}) {
console.log(photos);
 return (
   <div>
     {' '}
     {photos.map((r) => (
     console.log(r)
     ))}
   </div>
 )
}