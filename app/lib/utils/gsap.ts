import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExpoScaleEase } from 'gsap/EasePack'

gsap.registerPlugin(ScrollTrigger, ExpoScaleEase)

export default gsap