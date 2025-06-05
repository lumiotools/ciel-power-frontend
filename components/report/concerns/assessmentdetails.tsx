// {/* <Card className="max-h-fit w-full mx-auto">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle className="flex items-center text-3xl font-bold text-[#ff6700]">
//                 <Fan size={32} className="mr-4" />
//                 {isAdmin ? (
//                   <ReportEditableInput
//                     value={currentAssessment.title}
//                     onChange={(value) => {
//                       updateAssessmentData({ title: value as string });
//                     }}
//                     placeholder="Enter assessment title..."
//                     className="!text-3xl !font-bold !text-[#ff6700]"
//                   />
//                 ) : (
//                   currentAssessment.title
//                 )}
//               </CardTitle>
//               <div className="flex items-center gap-2">
//                 {isAdmin && (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => {
//                       if (
//                         window.confirm(
//                           "Are you sure you want to delete this assessment section?"
//                         )
//                       ) {
//                         // Clear the assessment data
//                         updateAssessmentData({
//                           title: "Assessment Details",
//                           subtitle: "",
//                           notes: "",
//                         });
//                         // Clear the images
//                         if (onUpdateImages) {
//                           onUpdateImages([]);
//                         }
//                         toast.success("Assessment section deleted");
//                       }
//                     }}
//                     className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                   >
//                     <Trash2 size={16} className="mr-1" />
//                     Delete
//                   </Button>
//                 )}
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={toggleExpanded}
//                   className="text-[#ff6700] border-2 border-[#ff6700] rounded-full p-2"
//                   aria-label={isExpanded ? "Hide section" : "Show section"}
//                 >
//                   <ChevronUp
//                     className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "" : "transform rotate-180"}`}
//                   />
//                 </Button>
//               </div>
//             </div>
//             {isAdmin ? (
//               <ReportEditableInput
//                 value={currentAssessment.subtitle}
//                 onChange={(value) => {
//                   updateAssessmentData({ subtitle: value as string });
//                 }}
//                 placeholder="Enter subtitle..."
//                 className="!text-lg !text-gray-600 !mt-2"
//               />
//             ) : (
//               currentAssessment.subtitle && (
//                 <p className="text-lg text-gray-600 mt-2">
//                   {currentAssessment.subtitle}
//                 </p>
//               )
//             )}
//           </CardHeader>

//           <CardContent>
//             <div
//               className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                 isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
//               }`}
//             >
//               <div className="w-full flex items-start justify-center gap-6 border-2 border-gray-200 rounded-lg p-6">
//                 <div className="flex flex-col items-start justify-start space-y-6 w-1/2">
//                   <div className="flex items-center gap-2 text-[#ff6700]">
//                     <Fan size={24} />
//                     <h3 className="text-2xl font-semibold">Assessment Notes</h3>
//                   </div>
//                   <div className="w-full">
//                     <textarea
//                       disabled={isUser}
//                       ref={textareaRef}
//                       value={currentAssessment.notes}
//                       onChange={handleNotesChange}
//                       placeholder="Add description here"
//                       className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6700] focus:border-transparent min-h-[265px] max-h-[265px] resize-none overflow-y-auto disabled:bg-gray-50 disabled:cursor-not-allowed"
//                       aria-label="Assessment notes"
//                     />
//                   </div>
//                 </div>

//                 {/* Right Image Areas with enhanced error handling */}
//                 <div className="w-1/2 flex flex-col gap-4">
//                   <div className="flex items-center justify-end">
//                     <div className="flex items-center gap-2">
//                       {isLoadingImages && (
//                         <div className="flex items-center gap-2 text-sm text-[#ff6700]">
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                           Loading...
//                         </div>
//                       )}
//                       {imageError && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={retryFetchImages}
//                           className="text-xs"
//                           disabled={isLoadingImages}
//                         >
//                           <RefreshCw className="h-3 w-3 mr-1" />
//                           Retry
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error Display */}
//                   {imageError && (
//                     <Card className="border-red-200 bg-red-50">
//                       <CardContent className="p-4">
//                         <div className="flex items-start gap-3">
//                           <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
//                           <div className="text-sm">
//                             <p className="text-red-800 font-medium mb-1">
//                               Unable to load images
//                             </p>
//                             <p className="text-red-600">{imageError}</p>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {imageSlots.map((image, index) => (
//                       <div key={index} className="h-64">
//                         <ReportImageViewer
//                           allowSelection={
//                             isAdmin && !isLoadingImages && !imageError
//                           }
//                           buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
//                           selectedImage={image || undefined}
//                           onOpenPicker={() =>
//                             image
//                               ? handleEditImage(index)
//                               : handleAddImage(index)
//                           }
//                           onDescriptionChange={(description) => {
//                             if (onUpdateImages && image) {
//                               const updatedImages = [...selectedImages];
//                               updatedImages[index] = {
//                                 ...image,
//                                 description: description as string,
//                               };
//                               onUpdateImages(updatedImages);
//                             }
//                           }}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </section> 