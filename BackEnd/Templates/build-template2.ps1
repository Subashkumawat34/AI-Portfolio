# Load all source files
$css = Get-Content "e:\projects\AI-Based portfolio\Portfollio\style.css" -Raw
$jsMain = Get-Content "e:\projects\AI-Based portfolio\Portfollio\script.js" -Raw
$jsTheme = Get-Content "e:\projects\AI-Based portfolio\Portfollio\js\theme.js" -Raw
$jsLoader = Get-Content "e:\projects\AI-Based portfolio\Portfollio\js\loader.js" -Raw
$jsSkills = Get-Content "e:\projects\AI-Based portfolio\Portfollio\js\skills-animation.js" -Raw
$jsTestimonials = Get-Content "e:\projects\AI-Based portfolio\Portfollio\js\testimonials.js" -Raw
$jsCursor = Get-Content "e:\projects\AI-Based portfolio\Portfollio\js\cursor.js" -Raw
$jsThree = Get-Content "e:\projects\AI-Based portfolio\Portfollio\js\three-scene.js" -Raw

# Combine all JavaScript
$allJs = @"
// ==================== All JavaScript Combined ====================
$jsLoader

$jsTheme

$jsSkills

$jsTestimonials

$jsCursor

$jsThree

$jsMain
"@

Write-Output "Building template2.ejs..."
Write-Output "CSS size: $($css.Length) chars"
Write-Output "JS size: $($allJs.Length) chars"

# Save combined JS for reference
$allJs | Out-File "e:\projects\AI-Based portfolio\website_generator-main\BackEnd\Templates\combined-scripts.js" -Encoding UTF8

Write-Output " Combined JavaScript saved"
Write-Output " CSS ready to embed"
Write-Output " Ready to assemble template"
